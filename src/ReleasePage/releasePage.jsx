import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useAuth0 } from '../Auth/Auth';
import ReleaseEntry from './releaseEntry';
import IconSet from '../lib/iconSet';

/**
 * Renders the data release UIs
 *
 * @param {Boolean} isAuthenticated   Redux state for user's authentication status.
 *
 * @returns {object} JSX representation of data release page elements.
 */
function ReleasePage() {
  // Custom Hook
  const { user, isAuthenticated } = useAuth0();

  const userMetadata = user && user['https://motrpac.org/user_metadata'] ? user['https://motrpac.org/user_metadata'] : null;
  const hasAccess = userMetadata && userMetadata.hasAccess;

  if (isAuthenticated) {
    if (!hasAccess) {
      return (<Redirect to="/error" />);
    }
  }

  // Render advanced search form by default
  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 px-4 dataReleasePage">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 border-bottom">
        <div className="page-title" style={{ backgroundImage: `url(${IconSet.InternalDataRelease})` }}>
          <h3>Data Releases</h3>
        </div>
        <div className="btn-toolbar">
          <div className="btn-group">
            {/* <Link className="browseDataBtn btn btn-sm btn-outline-primary" to="/download">Browse Data</Link> */}
            <Link className="advSearchBtn btn btn-sm btn-outline-primary" to="/search">Search Data</Link>
          </div>
        </div>
      </div>
      <ReleaseEntry />
    </div>
  );
}

export default ReleasePage;
