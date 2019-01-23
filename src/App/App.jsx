import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import 'bootstrap';
import History from './history';
import NavbarConnected from '../Navbar/navbar';
import FooterConnected from '../Footer/footer';
import LandingPageConnected from '../LandingPage/landingPage';
import DashboardConnected from '../Dashboard/dashboard';
import UploadScreenConnected from '../UploadPage/uploadScreen';
import LinkoutPageConnected from '../LinkoutPage/linkoutPage';
import AnalysisHomePageConnected from '../AnalysisPage/analysisHomePage';
import DownloadPageConnected from '../DownloadPage/downloadPage';
import MethodsConnected from '../MethodsPage/methods';
import TeamPage from '../TeamPage/teamPage';
import ContactPage from '../ContactPage/contactPage';
import CallbackConnected from '../Auth/callback';

const store = configureStore();

function App({ history = History }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <header>
            <NavbarConnected />
          </header>
          <div className="componentHolder">
            <Switch>
              <Route path="/callback" component={CallbackConnected} />
              <Route path="/" exact component={LandingPageConnected} />
              <Route path="/dashboard" component={DashboardConnected} />
              <Route path="/upload" component={UploadScreenConnected} />
              <Route path="/external-links" component={LinkoutPageConnected} />
              <Route path="/download" component={DownloadPageConnected} />
              <Route path="/analysis/:subjectType" component={AnalysisHomePageConnected} />
              <Route path="/methods" component={MethodsConnected} />
              <Route path="/team" component={TeamPage} />
              <Route path="/contact" component={ContactPage} />
            </Switch>
          </div>
          <FooterConnected />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
