import axios from 'axios';

export const TOGGLE_WEIGHT_PLOT = 'TOGGLE_WEIGHT_PLOT';
export const TOGGLE_BODY_FAT_PLOT = 'TOGGLE_BODY_FAT_PLOT';
export const TOGGLE_VO2_PLOT = 'TOGGLE_VO2_PLOT';
export const TOGGLE_LACTATE_PLOT = 'TOGGLE_LACTATE_PLOT';
export const SAVE_GENE_SEARCH_TERM = 'SAVE_GENE_SEARCH_TERM';
export const GENE_SEARCH_INPUT_CHANGE = 'GENE_SEARCH_INPUT_CHANGE';
export const GENE_SEARCH_SUBMIT = 'GENE_SEARCH_SUBMIT';
export const GENE_SEARCH_FAILURE = 'GENE_SEARCH_FAILURE';
export const GENE_SEARCH_SUCCESS = 'GENE_SEARCH_SUCCESS';

function toggleWeightPlot(weightPlot) {
  return {
    type: TOGGLE_WEIGHT_PLOT,
    weightPlot,
  };
}

function toggleBodyFatPlot(bodyFatPlot) {
  return {
    type: TOGGLE_BODY_FAT_PLOT,
    bodyFatPlot,
  };
}

function toggleVo2Plot(vo2Plot) {
  return {
    type: TOGGLE_VO2_PLOT,
    vo2Plot,
  };
}

function toggleLactatePlot(lactatePlot) {
  return {
    type: TOGGLE_LACTATE_PLOT,
    lactatePlot,
  };
}

function saveGeneSearchTerm(geneSymbol) {
  return {
    type: SAVE_GENE_SEARCH_TERM,
    geneSymbol,
  };
}

function geneSearchInputChange(e) {
  return {
    type: GENE_SEARCH_INPUT_CHANGE,
    inputValue: e.target.value,
  };
}

function geneSearchSubmit(geneSymbol) {
  return {
    type: GENE_SEARCH_SUBMIT,
    geneSymbol,
  };
}

function geneSearchFailure(geneSearchError = '') {
  return {
    type: GENE_SEARCH_FAILURE,
    geneSearchError,
  };
}

function geneSearchSuccess(geneSearchPayload) {
  return {
    type: GENE_SEARCH_SUCCESS,
    geneSearchPayload,
  };
}

// Handler for predefined searches
function fetchGeneData(geneSymbol) {
  return (dispatch) => {
    dispatch(geneSearchSubmit(geneSymbol));
    return axios
      .all([
        axios.get(
          `${process.env.REACT_APP_GOOGLEAPIS_STORAGE_URL}/meta-analysis/acute_muscle_gene_stats.json`
        ),
        axios.get(
          `${
            process.env.REACT_APP_GOOGLEAPIS_STORAGE_URL
          }/meta-analysis/acute-muscle/${geneSymbol.toUpperCase()}.json`
        ),
        axios.get(
          `${process.env.REACT_APP_GOOGLEAPIS_STORAGE_URL}/meta-analysis/acute_blood_gene_stats.json`
        ),
        axios.get(
          `${
            process.env.REACT_APP_GOOGLEAPIS_STORAGE_URL
          }/meta-analysis/acute-blood/${geneSymbol.toUpperCase()}.json`
        ),
      ])
      .then(
        axios.spread(
          (
            acuteMuscleGeneStat,
            acuteMuscleGeneAnalysis,
            acuteBloodGeneStat,
            acuteBloodGeneAnalysis
          ) => {
            const payload = {
              acuteMuscleGeneStat: acuteMuscleGeneStat.data,
              acuteMuscleGeneAnalysis: acuteMuscleGeneAnalysis.data,
              acuteBloodGeneStat: acuteBloodGeneStat.data,
              acuteBloodGeneAnalysis: acuteBloodGeneAnalysis.data,
            };
            dispatch(geneSearchSuccess(payload));
            dispatch(saveGeneSearchTerm(geneSymbol));
          }
        )
      )
      .catch((err) => {
        dispatch(geneSearchFailure(`${err.error}: ${err.errorDescription}`));
      });
  };
}

const AnalysisActions = {
  toggleWeightPlot,
  toggleBodyFatPlot,
  toggleVo2Plot,
  toggleLactatePlot,
  geneSearchInputChange,
  fetchGeneData,
};

export default AnalysisActions;
