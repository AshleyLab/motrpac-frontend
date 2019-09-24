import React from 'react';
import { render } from 'react-dom';
import { initializeReactGA } from './GoogleAnalytics/googleAnalytics';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './Auth/Auth';
import AUTH0_CONFIG from './Auth/auth_config';
import './main.css';

// Initialize Google Analytics
initializeReactGA();

const onRedirectCallback = (appState) => {
  // Firefox workaround
  // eslint-disable-next-line
  window.location.hash = window.location.hash;

  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

render(
  <Auth0Provider
    domain={AUTH0_CONFIG.domain}
    client_id={AUTH0_CONFIG.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
