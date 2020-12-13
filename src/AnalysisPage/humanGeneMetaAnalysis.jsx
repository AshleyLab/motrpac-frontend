import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryErrorBar,
  VictoryGroup,
} from 'victory';
import AnalysisActions from './analysisActions';

/**
 * Functional component to render human meta-analysis acute muscle data visualization
 * It uses internal states not shared by other components
 *
 * @return {Object} JSX representation of the meta analysis data visualization
 */
function HumanGeneMetaAnalysis({
  savedGeneSearches,
  geneSearchPayload,
  geneSearchError,
  geneSearchInput,
  geneSymbol,
  isGeneSearchInProgress,
  handleGeneSearchInputChange,
  fetchGeneData,
}) {
  /**
   * Utility function - simple Math.round method
   * alternative #1 - Math.round(num * 10) / 10; //*** returns 1 decimal
   * alternative #2 - Math.round((num + 0.00001) * 100) / 100; //*** returns 2 decimals
   */
  const classificationMathRound = (number, decimals) => {
    return Number(Math.round(number + ('e' + decimals)) + ('e-' + decimals));
  };

  function getGeneStat(tissue) {
    let geneStat;
    if (tissue === 'acute-muscle') {
      geneStat = geneSearchPayload.acuteMuscleGeneStat.find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );
    } else if (tissue === 'acute-blood') {
      geneStat = geneSearchPayload.acuteBloodGeneStat.find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );
    }

    return geneStat;
  }

  // Renders found gene stats info in the gene search panel
  function renderGeneStat(tissue) {
    const geneStat = getGeneStat(tissue);
    if (geneStat && Object.keys(geneStat).length) {
      const geneObjClone = { ...geneStat };
      delete geneObjClone.Name;
      delete geneObjClone.Summary;

      return (
        <div className="col col-md-6 gene-stat-plot-wrapper">
          <div className="gene-stat-container">
            <table className="table table-sm table-striped">
              <tbody>
                {Object.entries(geneObjClone).map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{`${key}:`}</th>
                      <td>{!Number.isNaN(classificationMathRound(Number(value), 2)) ? classificationMathRound(Number(value), 2) : value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {renderForestPlot(tissue)}
        </div>
      );
    }

    return null;
  }

  function getGeneAnalysisData(tissue) {
    let geneAnalysisData;
    if (tissue === 'acute-muscle') {
      geneAnalysisData = geneSearchPayload.acuteMuscleGeneAnalysis;
    } else if (tissue === 'acute-blood') {
      geneAnalysisData = geneSearchPayload.acuteBloodGeneAnalysis;
    }

    return geneAnalysisData;
  }

  // Renders table head of gene meta-analysis
  const renderMetaAnalysisTableHead = () => {
    return (
      <tr className="table-head">
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Cohort ID</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Geo ID</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Training</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Avg Age</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Age SD</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">SDD</th>
      </tr>
    );
  };

  // Renders individual rows of gene meta-analysis data
  const renderMetaAnalysisTableRows = (data) => {
    const rows = data.map(item => (
      <tr key={item.sdd} className={`${item.avg_age} ${item.age_sd} ${item.sdd}`}>
        <td className="gene-meta-analysis-value text-nowrap">{item.V1}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.gse}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.training}</td>
        <td className="gene-meta-analysis-value text-nowrap">{classificationMathRound(Number(item.avg_age), 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{classificationMathRound(Number(item.age_sd), 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{classificationMathRound(Number(item.sdd), 2)}</td>
      </tr>
    ));

    return rows;
  };

  // Renders meta-analysis of a gene for acute muscle
  function renderGeneAnalysisData(tissue) {
    const geneAnalysisData = getGeneAnalysisData(tissue);
    if (geneAnalysisData && geneAnalysisData.length) {
      return (
        <div className="col col-md-6 gene-meta-analysis-container">
          <div className="table-responsive meta-analysis-data-table-wrapper">
            <table className="table table-sm table-striped geneAnalysisDataTable">
              <thead className="thead-dark">
                {renderMetaAnalysisTableHead()}
              </thead>
              <tbody>{renderMetaAnalysisTableRows(geneAnalysisData)}</tbody>
            </table>
          </div>
          <div className="note-comment d-flex align-items-center text-secondary">
            <span className="material-icons">info</span>
            <span>
              A cohort can have more than a single data point in a time window.
            </span>
          </div>
        </div>
      );
    }

    return null;
  }

  function confidenceIntervalBounds(item) {
    const bounds = {};
    const sei = Math.sqrt(+item.vi);
    bounds.lowerBound = +item.yi - 1.96 * sei;
    bounds.upperBound = +item.yi + 1.96 * sei;
    return bounds;
  }

  function getIntervalBounds(data) {
    const intervalBounds = {
      lowerBounds: [],
      upperBounds: [],
    };
    if (data && data.length) {
      data.forEach((item) => {
        const bounds = confidenceIntervalBounds(item);
        intervalBounds.lowerBounds.push(bounds.lowerBound);
        intervalBounds.upperBounds.push(bounds.upperBound);
      });
    }

    return intervalBounds;
  }

  function computeXdomainRange(data) {
    const intervalBounds = getIntervalBounds(data);
    const xRange = {
      min: null,
      max: null,
    };
    if (
      intervalBounds.lowerBounds.length &&
      intervalBounds.upperBounds.length
    ) {
      xRange.min = Math.floor(Math.min(...intervalBounds.lowerBounds));
      xRange.max = Math.ceil(Math.max(...intervalBounds.upperBounds));
    }

    return xRange;
  }

  function plotData(type, data) {
    const scatter = [];
    const errorbar = [];
    if (data && data.length) {
      data.forEach((item) => {
        const bounds = confidenceIntervalBounds(item);
        const scatterDataObj = {
          x: +item.yi,
          y: data.indexOf(item) + 1,
          symbol: 'square',
          size: 5.5 - 5 * (bounds.upperBound - bounds.lowerBound),
        };
        scatter.push(scatterDataObj);
        const errorBarDataObj = {
          x: +item.yi,
          y: data.indexOf(item) + 1,
          errorX: (bounds.upperBound - bounds.lowerBound) / 2,
        };
        errorbar.push(errorBarDataObj);
      });
    }

    return type === 'scatter' ? scatter : errorbar;
  }

  function getTickValues(data) {
    const tickValues = [];
    const trainingTypeMappings = {
      endurance: 'EN',
      resistance: 'RE',
      endurance_treatment: 'EN_TR',
    };

    if (data && data.length) {
      data.forEach((item) => {
        let value = '';
        const bounds = confidenceIntervalBounds(item);
        value = `${item.V1.substring(3)}, ${
          trainingTypeMappings[item.training]
        }, ${item.time}, ${classificationMathRound(
          Number(item.yi),
          2
        )} [${classificationMathRound(
          Number(bounds.lowerBound),
          2
        )}, ${classificationMathRound(Number(bounds.upperBound), 2)}]`;
        tickValues.push(value);
      });
    }

    return tickValues;
  }

  function renderForestPlot(tissue) {
    const geneAnalysisData = getGeneAnalysisData(tissue).reverse();
    const xDomainRange = computeXdomainRange(geneAnalysisData);

    return (
      <div className="meta-analysis-forest-plot">
        <VictoryChart
          domain={{
            x: [xDomainRange.min, xDomainRange.max],
            y: [0, geneAnalysisData.length],
          }}
          height={geneAnalysisData.length * 12}
          padding={{ top: 20, bottom: 30, left: 140, right: 20 }}
        >
          <VictoryGroup>
            <VictoryScatter
              style={{ data: { fill: '#000' } }}
              size={7}
              data={plotData('scatter', geneAnalysisData)}
            />
            <VictoryErrorBar
              borderWidth={4}
              data={plotData('errorbar', geneAnalysisData)}
              style={{
                data: {
                  strokeWidth: 1,
                },
              }}
            />
          </VictoryGroup>
          <VictoryAxis
            crossAxis
            label="log2(fchange)"
            style={{
              axisLabel: { fontSize: 12, padding: 10 },
              ticks: { stroke: '#000', size: 5 },
              tickLabels: { fontSize: 9, padding: 2 },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: '#cdcdcd' },
              tickLabels: { fontSize: 8, padding: 145 },
            }}
            tickValues={getTickValues(geneAnalysisData)}
          />
        </VictoryChart>
      </div>
    );
  }

  // render recent user searched gene symbols if no error
  // otherwise, render error message
  function renderSavedSearches() {
    if (geneSearchError && geneSearchError.length) {
      return (
        <div className="search-error-message text-danger ml-3">
          No matching gene was found.
        </div>
      );
    }

    if (!geneSearchError && savedGeneSearches.length) {
      return (
        <div className="recent-search-terms ml-3">
          <span className="recent-search-terms-label text-muted mr-2">
            Recent searches:
          </span>
          {savedGeneSearches.map((item) => {
            return (
              <span key={item} className="badge badge-pill badge-success mr-2">
                {item}
              </span>
            );
          })}
        </div>
      );
    }

    return null;
  }

  function renderGeneDefinition() {
    const geneStat = getGeneStat('acute-muscle');
    if (geneStat && Object.keys(geneStat).length) {
      return (
        <dl className="gene-definition-container">
          <dt>Name:</dt>
          <dd>{geneStat.Name}</dd>
          <dt>Summary:</dt>
          <dd>{geneStat.Summary}</dd>
        </dl>
      );
    }

    return null;
  }

  function renderAcuteMuscleAnalysis() {
    return (
      <div className="card shadow-sm mb-4 acute-muscle-analysis-data-container">
        <div className="card-body">
          <h5 className="card-title mb-4">Acute Muscle</h5>
          <div className="d-flex align-items-start">
            {renderGeneStat('acute-muscle')}
            {renderGeneAnalysisData('acute-muscle')}
          </div>
        </div>
      </div>
    );
  }

  function renderAcuteBloodAnalysis() {
    return (
      <div className="card shadow-sm mb-4 acute-blood-analysis-data-container">
        <div className="card-body">
          <h5 className="card-title mb-4">Acute Blood</h5>
          <div className="d-flex align-items-start">
            {renderGeneStat('acute-blood')}
            {renderGeneAnalysisData('acute-blood')}
          </div>
        </div>
      </div>
    );
  }

  function renderResult() {
    if (
      !isGeneSearchInProgress &&
      geneSearchPayload &&
      Object.keys(geneSearchPayload).length
    ) {
      return (
        <div className="meta-analysis-data-container">
          <h2 className="border-bottom py-2">{geneSymbol.toUpperCase()}</h2>
          {renderGeneDefinition()}
          {renderAcuteMuscleAnalysis()}
          {renderAcuteBloodAnalysis()}
        </div>
      );
    }

    return null;
  }

  return (
    <div className="human-gene-meta-analysis">
      {/*
      <div className="alert alert-warning alert-dismissible fade show warning-note d-flex align-items-center" role="alert">
        <span className="material-icons">info</span>
        <span className="warning-note-text">
          The following analyses use existing published data sets. They
          do not represent the complete meta-analysis data set. Only
          5 genes (FOXO1, ID1, PPARGC1A, SMAD3, VEGFA) are available for
          searching in this release.
        </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      */}
      <div className="meta-analysis-content-container pt-2">
        {/* gene search */}
        <div className="gene-search-container px-0 mb-3">
          <div className="gene-search-content">
            <form
              id="metaAnalysisGeneSearchForm"
              name="metaAnalysisGeneSearchForm"
              className="form-inline"
              onSubmit={(e) => {
                e.preventDefault();
                fetchGeneData(geneSearchInput);
              }}
            >
              <label htmlFor="geneSymbolSearchInput">Select a gene:</label>
              <div className="input-group ml-2">
                <input
                  type="text"
                  className="form-control w-100"
                  id="geneSymbolSearchInput"
                  value={geneSearchInput}
                  placeholder="FOXO1, ID1, PPARGC1A, SMAD3, VEGFA, etc"
                  aria-label="FOXO1, ID1, PPARGC1A, SMAD3, VEGFA, etc"
                  aria-describedby="gene-search-btn"
                  onChange={(e) => {
                    e.preventDefault();
                    handleGeneSearchInputChange(e);
                  }}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    id="gene-search-btn"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchGeneData(geneSearchInput);
                    }}
                  >
                    <i className="material-icons">search</i>
                  </button>
                </div>
              </div>
              {renderSavedSearches()}
            </form>
          </div>
        </div>
        {/* meta-analysis data container */}
        {isGeneSearchInProgress && (
          <div className="meta-analysis-data-container">
            <h5 className="font-italic">Loading...</h5>
          </div>
        )}
        {renderResult()}
      </div>
    </div>
  );
}

HumanGeneMetaAnalysis.propTypes = {
  savedGeneSearches: PropTypes.arrayOf(PropTypes.string),
  geneSearchPayload: PropTypes.shape({
    data: PropTypes.object,
  }),
  geneSearchError: PropTypes.string,
  geneSearchInput: PropTypes.string,
  geneSymbol: PropTypes.string,
  isGeneSearchInProgress: PropTypes.bool,
  handleGeneSearchInputChange: PropTypes.func.isRequired,
  fetchGeneData: PropTypes.func.isRequired,
};

HumanGeneMetaAnalysis.defaultProps = {
  savedGeneSearches: [],
  geneSearchPayload: {},
  geneSearchError: null,
  geneSearchInput: '',
  geneSymbol: '',
  isGeneSearchInProgress: false,
};

const mapStateToProps = (state) => ({
  ...state.analysis,
});

const mapDispatchToProps = (dispatch) => ({
  handleGeneSearchInputChange: (e) =>
    dispatch(AnalysisActions.geneSearchInputChange(e)),
  fetchGeneData: (geneSymbol) =>
    dispatch(AnalysisActions.fetchGeneData(geneSymbol)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanGeneMetaAnalysis);
