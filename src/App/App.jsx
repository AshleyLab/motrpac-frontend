import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import 'bootstrap';
import History from './history';
import NavbarConnected from '../Navbar/navbar';
import Footer from '../Footer/footer';
import LandingPage from '../LandingPage/landingPage';
import DashboardConnected from '../Dashboard/dashboard';
import UploadScreenConnected from '../UploadPage/uploadScreen';
import LinkoutPageConnected from '../LinkoutPage/linkoutPage';
import AnalysisHomePageConnected from '../AnalysisPage/analysisHomePage';
import DownloadPageConnected from '../DownloadPage/downloadPage';
import MethodsConnected from '../MethodsPage/methods';
import TeamPageConnected from '../TeamPage/teamPage';
import ContactConnected from '../ContactPage/contact';
import ErrorPageConnected from '../ErrorPage/error';
import SearchPageConnected from '../Search/searchPage';
import ReleasePage from '../ReleasePage/releasePage';
import DataSummaryPageConnected from '../DataSummaryPage/dataSummaryPage';
import SidebarConnected from '../Sidebar/sidebar';
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
              <PrivateRoute path="/dashboard" component={withTracker(DashboardConnected)} />
              <PrivateRoute path="/upload" component={withTracker(UploadScreenConnected)} />
              <Route path="/external-links" component={withTracker(LinkoutPageConnected)} />
              <PrivateRoute path="/download" component={withTracker(DownloadPageConnected)} />
              <PrivateRoute path="/analysis/:subjectType" component={withTracker(AnalysisHomePageConnected)} />
              <PrivateRoute path="/methods" component={withTracker(MethodsConnected)} />
              <Route path="/team" component={withTracker(TeamPageConnected)} />
              <Route path="/contact" component={withTracker(ContactConnected)} />
              <Route path="/error" component={withTracker(ErrorPageConnected)} />
              <PrivateRoute path="/search" component={withTracker(SearchPageConnected)} />
              <PrivateRoute path="/summary" component={withTracker(DataSummaryPageConnected)} />
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
