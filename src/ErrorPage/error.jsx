import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '../Auth/Auth';

/**
 * Renders the Error page.
 *
 * @returns {Object} JSX representation of the Error page.
 */
export function ErrorPage() {
  // Custom Hook
  const { user, isAuthenticated } = useAuth0();

  const userMetadata = user && user['https://motrpac.org/user_metadata'] ? user['https://motrpac.org/user_metadata'] : null;
  const hasAccess = userMetadata && userMetadata.hasAccess;

  if (isAuthenticated && hasAccess) {
    return <Redirect to="/releases" />;
  }

  return (
    <div className="col-md-9 col-lg-10 px-4 errorPage">
      <div className="container">
        <div className="page-title pt-5 pb-3">
          <h3>Authorized MoTrPAC Consortia Members Only</h3>
        </div>
        <div className="contact-content-container">
          <p className="alert alert-warning">
            At this time, access to the MoTrPAC Data Hub data resources is limited
            to Consortia members only. Please contact the MoTrPAC Helpdesk at&nbsp;
            <a href="mailto:motrpac-helpdesk@lists.stanford.edu" target="_new">motrpac-helpdesk@lists.stanford.edu</a>
            &nbsp;and request access to the portal.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
