import React from 'react';
import { useAuth0 } from '../Auth/Auth';
import LoginButton from '../lib/loginButton';
import MoTrPAClogo from '../assets/logo-motrpac.png';

/**
 * Renders the global footer.
 *
 * @returns {object} JSX representation of the global footer.
 */
function Footer() {
  // Custom Hook
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  // Function to get current copyright year
  const getCopyrightYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return year;
  };

  const userMetadata = user && user['https://motrpac.org/user_metadata'] ? user['https://motrpac.org/user_metadata'] : null;
  const hasAccess = userMetadata && userMetadata.hasAccess;

  // TODO: Find out how to best do error handling
  return (
    <footer className="footer">
      {!(isAuthenticated && hasAccess) && (
        <div className="container footer-nav">
          <div className="row align-items-end">
            <div className="col-12 col-lg-4 footer-nav-logo">
              <a href="/" className="navbar-brand footer-logo">
                <img default src={MoTrPAClogo} alt="MoTrPAC Data Hub" />
              </a>
            </div>
            <div className="col-12 col-lg-8 row justify-content-end footer-nav-items">
              <ul className="nav">
                <li className="nav-item navItem"><a href="/" className="nav-link">Home</a></li>
                <li className="nav-item navItem"><a href="/team" className="nav-link">About Us</a></li>
                <li className="nav-item navItem"><a href="/contact" className="nav-link">Contact Us</a></li>
                <li className="nav-item navItem">
                  <LoginButton login={() => loginWithRedirect({})} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="footer-disclaimers">
        <div className="footer-content">
          <span>
            MoTrPAC Data Hub is designed and maintained by the MoTrPAC BioInformatics
            Center at&nbsp;
            <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer">
              Stanford University
            </a>
            <span>.&nbsp;</span>
          </span>
          <span>
            Funded by the&nbsp;
            <a href="https://commonfund.nih.gov/" target="_blank" rel="noopener noreferrer">
              NIH Common Fund
            </a>
            <span>.</span>
          </span>
        </div>
        <div className="footer-content">
          &#169;
          {getCopyrightYear()}
          &nbsp;Stanford University
        </div>
      </div>
    </footer>
  );
}

export default Footer;
