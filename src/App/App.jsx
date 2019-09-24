import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import 'bootstrap';
import History from './history';
import Footer from '../Footer/footer';
import LandingPage from '../LandingPage/landingPage';
import TeamPage from '../TeamPage/teamPage';
import LinkoutPage from '../LinkoutPage/linkoutPage';
import Contact from '../ContactPage/contact';
import ErrorPage from '../ErrorPage/error';
import Methods from '../MethodsPage/methods';
import DataSummaryPage from '../DataSummaryPage/dataSummaryPage';
import ReleasePage from '../ReleasePage/releasePage';
import NavbarConnected from '../Navbar/navbar';
import SidebarConnected from '../Sidebar/sidebar';
import DashboardConnected from '../Dashboard/dashboard';
import UploadScreenConnected from '../UploadPage/uploadScreen';
import AnalysisHomePageConnected from '../AnalysisPage/analysisHomePage';
import DownloadPageConnected from '../DownloadPage/downloadPage';
import SearchPageConnected from '../Search/searchPage';
import { withTracker } from '../GoogleAnalytics/googleAnalytics';
import PrivateRoute from '../Auth/PrivateRoute';
import { useAuth0 } from '../Auth/Auth';
import AnimatedLoadingIcon from '../lib/ui/loading';

const store = configureStore();

function App({ history = History }) {
  const { loading } = useAuth0();

  if (loading) {
    return <AnimatedLoadingIcon isFetching={loading} />;
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App container-fluid">
          <header>
            <NavbarConnected />
          </header>
          <div className="row justify-content-center">
            <SidebarConnected />
            <Switch>
              <Route path="/" exact component={withTracker(LandingPage)} />
              <Route path="/team" component={withTracker(TeamPage)} />
              <Route path="/external-links" component={withTracker(LinkoutPage)} />
              <Route path="/contact" component={withTracker(Contact)} />
              <Route path="/error" component={withTracker(ErrorPage)} />
              <PrivateRoute path="/dashboard" component={withTracker(DashboardConnected)} />
              <PrivateRoute path="/upload" component={withTracker(UploadScreenConnected)} />
              <PrivateRoute path="/download" component={withTracker(DownloadPageConnected)} />
              <PrivateRoute path="/analysis/:subjectType" component={withTracker(AnalysisHomePageConnected)} />
              <PrivateRoute path="/methods" component={withTracker(Methods)} />
              <PrivateRoute path="/search" component={withTracker(SearchPageConnected)} />
              <PrivateRoute path="/summary" component={withTracker(DataSummaryPage)} />
              <PrivateRoute path="/releases" component={withTracker(ReleasePage)} />
            </Switch>
          </div>
        </div>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
