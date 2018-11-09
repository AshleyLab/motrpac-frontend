import React from 'react';
import { connect } from 'react-redux';

export function Footer({
  user,
  loggedIn = false,
  onLogIn,
  onLogOut,
}) {
  // TODO: Find out how to best do error handling
  const footer = (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>
              Data Hub designed and maintained by the MoTrPAC
              BioInformatics Center at
              <a href="https://www.stanford.edu/" target="_new"> Stanford University</a>
            </p>
            <p>
              Funded by the
              <a href="https://commonfund.nih.gov/" target="_new"> NIH Common Fund</a>
            </p>
          </div>
          <div className="col copyright">
            <p>&#169; XXXX 2018</p>
          </div>
          <div className="col rightAlign">
            <AuthButton loggedInStatus={loggedIn} user={user} onLogIn={onLogIn} onLogOut={onLogOut} />
          </div>
        </div>
      </div>
    </footer>

  );
  return footer;
}

function AuthButton({
  loggedInStatus,
  user,
  onLogIn,
  onLogOut,
}) {
  if (loggedInStatus === true) {
    return (
      <button type="button" onClick={onLogOut} className="logInOutBtn btn">
        {`${user.name} Logout`}
      </button>
    );
  }
  return (
    <button type="button" onClick={onLogIn} className="logInOutBtn btn">
      Submitter Login
    </button>
  );
}


const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});


const testUser = require('../testData/testUser');

const mapDispatchToProps = dispatch => ({
  onLogIn: () => dispatch({
    type: 'LOGIN_SUCCESS',
    user: testUser,
  }),
  onLogOut: () => dispatch({
    type: 'LOGOUT',
  }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Footer);
