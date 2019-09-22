import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../Auth/Auth';
import LoginButton from '../lib/loginButton';
import QuickSearchBox from '../Search/quickSearchBox';
import MoTrPAClogo from '../assets/logo-motrpac.png';
import QuickSearchBoxActions from '../Search/quickSearchBoxActions';
import SearchActions from '../Search/searchActions';

/**
 * Renders the global header nav bar.
 *
 * @param {Boolean}   isAuthenticated Redux state for user's authentication status.
 * @param {Object}    profile         Redux state for authenticated user's info.
 * @param {Function}  login           Redux action for user login.
 * @param {Function}  logout          Redux action for user logout.
 *
 * @returns {Object} JSX representation of the global header nav bar.
 */
export function Navbar({
  quickSearchTerm,
  handleQuickSearchInputChange,
  handleQuickSearchRequestSubmit,
  resetQuickSearch,
  getSearchForm,
  resetAdvSearch,
}) {
  // Custom Hook
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  const userMetadata = user && user['https://motrpac.org/user_metadata'] ? user['https://motrpac.org/user_metadata'] : null;
  const hasAccess = userMetadata && userMetadata.hasAccess;

  if (isAuthenticated && hasAccess) {
    document.querySelector('body').classList.add('authenticated');
  }

  // Function to render login button
  const LogoutButton = () => {
    const userDefaultName = user && user.name ? user.name : null;
    const userDisplayName = userMetadata && userMetadata.name ? userMetadata.name : userDefaultName;
    const siteName = userMetadata && userMetadata.siteName ? `, ${userMetadata.siteName}` : '';

    if (isAuthenticated && hasAccess) {
      return (
        <span className="user-logout-button">
          <img src={user.picture} className="user-avatar" alt="avatar" />
          <span className="user-display-name">
            {userDisplayName}
            {siteName}
          </span>
          <button type="button" onClick={() => logoutWithRedirect()} className="logOutBtn btn btn-primary">
            Log out
          </button>
        </span>
      );
    }

    return <LoginButton login={() => loginWithRedirect({})} />;
  };

  const navbar = (
    <div className="header-navbar-container fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light flex-md-nowrap p-0 shadow-sm bg-white">
        <div className={`${isAuthenticated && hasAccess ? 'container-fluid' : 'container'} header-navbar-items`}>
          <Link to="/" className={`navbar-brand header-logo ${isAuthenticated && hasAccess ? 'resized' : ''}`}>
            <img default src={MoTrPAClogo} alt="MoTrPAC Data Hub" />
            <span className="badge badge-pill badge-warning">Alpha</span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item navItem dropdown">
                <div className="nav-link dropdown-toggle" role="button" id="navbarDropdownMenuLink" data-toggle="dropdown">About Us</div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link to="/external-links" className="dropdown-item">Useful Links</Link>
                  <Link to="/team" className="dropdown-item">Who we are</Link>
                </div>
              </li>
              <li className="nav-item navItem"><Link to="/contact" className="nav-link">Contact Us</Link></li>
              <li className="nav-item navItem">
                <LogoutButton />
              </li>
            </ul>
            {isAuthenticated && hasAccess
              ? (
                <QuickSearchBox
                  quickSearchTerm={quickSearchTerm}
                  handleQuickSearchInputChange={handleQuickSearchInputChange}
                  handleQuickSearchRequestSubmit={handleQuickSearchRequestSubmit}
                  resetQuickSearch={resetQuickSearch}
                  getSearchForm={getSearchForm}
                  resetAdvSearch={resetAdvSearch}
                />
              )
              : null}
          </div>
        </div>
      </nav>
    </div>
  );
  return navbar;
}

Navbar.propTypes = {
  quickSearchTerm: PropTypes.string,
  handleQuickSearchInputChange: PropTypes.func,
  handleQuickSearchRequestSubmit: PropTypes.func,
  resetQuickSearch: PropTypes.func,
  getSearchForm: PropTypes.func,
};

Navbar.defaultProps = {
  quickSearchTerm: '',
  handleQuickSearchInputChange: null,
  handleQuickSearchRequestSubmit: null,
  resetQuickSearch: null,
  getSearchForm: null,
};

const mapStateToProps = state => ({
  ...(state.quickSearch),
});

const mapDispatchToProps = dispatch => ({
  handleQuickSearchInputChange: e => dispatch(QuickSearchBoxActions.quickSearchInputChange(e)),
  handleQuickSearchRequestSubmit: searchTerm => dispatch(QuickSearchBoxActions.handleQuickSearchRequestSubmit(searchTerm)),
  resetQuickSearch: () => dispatch(QuickSearchBoxActions.quickSearchReset()),
  getSearchForm: () => dispatch(SearchActions.getSearchForm()),
  resetAdvSearch: () => dispatch(SearchActions.searchFormReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
