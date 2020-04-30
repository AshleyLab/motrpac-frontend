import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';

const rawData = require('../data/qc_report_metabolomics');

/**
 * Utility function to return the sum of all issues
 */
const toSum = (list) => {
  let total = 0;
  list.forEach((value) => {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(Number(value))) {
      total += Number(value);
    }
  });
  return total;
};

/**
 * Utility function to tranform each object in raw qc data array
 */
const transformData = () => {
  const cloneArray = [...rawData];
  // Replace instances of 'OK' string to 'PASS'
  const newArray = JSON.stringify(cloneArray).replace(/OK/g, 'PASS');
  const tranformArray = JSON.parse(newArray);
  // Add new 'issues' property
  tranformArray.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.issues = toSum([
      item.critical_issues,
      item.m_metab_n,
      item.m_metab_u,
      item.m_sample_n,
      item.m_sample_u,
      item.results_n,
      item.results_u,
    ]);
    // eslint-disable-next-line no-param-reassign
    item.tissue = `${item.tissue} ${item.t_name}`;
  });
  return tranformArray;
};

/**
 * Renders global filter UI
 */
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="form-group d-flex align-items-center justify-content-end">
      <label htmlFor="searchFilterInput">Search:</label>
      <input
        type="text"
        className="form-control"
        id="searchFilterInput"
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`${count} entries`}
      />
    </div>
  );
}

/**
 * Sets up table column headers and renders the table component
 *
 * @returns {object} The data qc status table component
 */
function StatusReportMetabolomics() {
  // Define table column headers
  const columns = useMemo(
    () => [
      {
        Header: 'CAS',
        accessor: 'cas',
      },
      {
        Header: 'Phase',
        accessor: 'phase',
      },
      {
        Header: 'Tissue',
        accessor: 'tissue',
      },
      {
        Header: 'Assay',
        accessor: 'assay',
      },
      {
        Header: 'Version',
        accessor: 'version',
      },
      {
        Header: 'Vials',
        accessor: 'vial_label',
      },
      {
        Header: 'QC Samples',
        accessor: 'qc_samples',
      },
      {
        Header: 'Issues',
        accessor: 'issues',
      },
      {
        Header: 'DMAQC',
        accessor: 'dmaqc_valid',
      },
      {
        Header: 'Raw Manifest',
        accessor: 'raw_manifest',
      },
      {
        Header: 'QC Date',
        accessor: 'qc_date',
      },
    ],
    [],
  );

  const data = useMemo(() => transformData(), []);

  return <DataTable columns={columns} data={data} />;
}

/**
 * Renders the data qc status table
 *
 * @param {Array} columns Array of column header labels and its data source
 *
 * @returns {object} JSX representation of table on data qc status
 */
function DataTable({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
          : true;
      }),
    }),
    [],
  );

  // Use the useTable hook to create your table configuration
  const instance = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        pageCount: 7,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    pageOptions,
    pageCount,
    page,
    state: { pageIndex, pageSize, globalFilter },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = instance;

  // Render the UI for your table
  // react-table doesn't have UI, it's headless. We just need to put the react-table
  // props from the Hooks, and it will do its magic automatically
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="pagination-page-count d-flex align-items-center justify-content-start">
          <span className="page-index">
            Page
            {' '}
            {pageIndex + 1}
            {' '}
            of
            {' '}
            {pageOptions.length}
            {' '}
          </span>
          <select
            className="form-control"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, 60, 70].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show
                {' '}
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="table-responsive">
            <table {...getTableProps()} className="table table-sm dataStatusTable">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="table-head">
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        <div className="d-flex align-items-center justify-content-between">
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? <i className="material-icons">expand_more</i>
                                : <i className="material-icons">expand_less</i>
                              : <i className="material-icons">unfold_more</i>}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => <td {...cell.getCellProps()} className={cell.value}>{cell.render('Cell')}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="btn-group pagination-control d-flex align-items-center justify-content-end" role="group">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          First
        </button>
        {' '}
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        {' '}
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        {' '}
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          Last
        </button>
      </div>
    </>
  );
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.arrayOf(PropTypes.shape({
    cas: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    tissue: PropTypes.string.isRequired,
    assay: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    vial_label: PropTypes.string.isRequired,
    qc_samples: PropTypes.string.isRequired,
    issues: PropTypes.string.isRequired,
    dmaqc_valid: PropTypes.string.isRequired,
    raw_manifest: PropTypes.string.isRequired,
    qc_date: PropTypes.string.isRequired,
  })).isRequired,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    cas: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    tissue: PropTypes.string.isRequired,
    assay: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    vial_label: PropTypes.string.isRequired,
    qc_samples: PropTypes.string.isRequired,
    issues: PropTypes.string.isRequired,
    dmaqc_valid: PropTypes.string.isRequired,
    raw_manifest: PropTypes.string.isRequired,
    qc_date: PropTypes.string.isRequired,
  })).isRequired,
};

export default StatusReportMetabolomics;