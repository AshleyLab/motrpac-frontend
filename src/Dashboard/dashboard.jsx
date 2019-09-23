import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PreviousUploadsTableConnected, { PreviousUploadsTable } from '../Widgets/previousUploadsTable';
import PreviousUploadsGraph from '../Widgets/previousUploadsGraph';
import AllUploadsDoughnut from '../Widgets/allUploadsDoughnut';
import AllUploadStats from '../Widgets/allUploadStats';
import actions from '../UploadPage/uploadActions';
import { useAuth0 } from '../Auth/Auth';

const allUploads = require('../testData/testAllUploads');

/**
 * Renders the Dashboard page.
 *
 * @param {Object}    featureAvailable      Flag to render dashboard edit button.
 * @param {Array}     previousUploads       Redux state for user's previous uploads.
 * @param {Boolean}   disconnectComponents  Flag to render Redux-connected previous upload table.
 * @param {Function}  clearForm             Redux action to reset upload form.
 *
 * @returns {object} JSX representation of the dashboard page.
 */
export function Dashboard({
  featureAvailable,
  previousUploads,
  disconnectComponents,
  clearForm,
}) {
  // Custom Hook
  const { user, isAuthenticated } = useAuth0();

  const userMetadata = user && user['https://motrpac.org/user_metadata'] ? user['https://motrpac.org/user_metadata'] : null;
  const hasAccess = userMetadata && userMetadata.hasAccess;

  if (isAuthenticated) {
    if (!hasAccess) {
      return (<Redirect to="/error" />);
    }
  }

  const editBtn = (
    <div className="col-auto">
      <Link className="editBtn btn btn-light disabled" to="/edit-dashboard">Edit Dashboard</Link>
    </div>
  );

  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 px-4 Dashboard">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="page-title">
          <h3>Dashboard</h3>
        </div>
        <div className="btn-toolbar">
          <div className="btn-group">
            <Link className="uploadBtn btn btn-sm btn-outline-primary" to="/upload" onClick={clearForm}>Upload Data</Link>
            <Link className="downloadBtn btn btn-sm btn-outline-primary" to="/download">Download/View Data</Link>
          </div>
        </div>
        {featureAvailable.dashboardEditable ? editBtn : ''}
      </div>
      <div className="previous-uploads-table">
        <div className="card">
          <h5 className="card-header">Uploads</h5>
          <div className="card-body">
            { disconnectComponents
              ? <PreviousUploadsTable previousUploads={previousUploads} />
              : <PreviousUploadsTableConnected />
            }
          </div>
        </div>
      </div>
      <div className="previous-uploads-graph">
        <div className="card">
          <h5 className="card-header">Assay Categories</h5>
          <div className="card-body">
            <PreviousUploadsGraph previousUploads={previousUploads} />
          </div>
        </div>
      </div>
      <div className="total-uploads-graph">
        <div className="card">
          <h5 className="card-header">Total Uploads By All Sites</h5>
          <div className="card-body">
            <div className="row justify-content-center">
              <AllUploadsDoughnut allUploads={allUploads} />
              <AllUploadStats />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  featureAvailable: PropTypes.shape({
    dashboardEditable: PropTypes.bool,
  }),
  previousUploads: PropTypes.arrayOf(PropTypes.shape({
    identifier: PropTypes.string,
  })).isRequired,
  disconnectComponents: PropTypes.bool,
  clearForm: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  featureAvailable: {
    dashboardEditable: false,
  },
  disconnectComponents: false,
};

const mapStateToProps = state => ({
  previousUploads: state.upload.previousUploads,
});

// Need to clear the upload form values and recently uploaded files
// if user navigates away from and returns to the upload page
const mapDispatchToProps = dispatch => ({
  clearForm: () => dispatch(actions.clearForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
