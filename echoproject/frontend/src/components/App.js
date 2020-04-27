import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./react-alert-template-custom";
import Header from "./layout/Header";
import WelcomePage from "./home/PageWelcome";
import SeriesPage from "./series/PageSeries";
import MatchesPage from "./matches/PageMatchSelect";
import CasterPage from "./caster/PageCaster";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// react-alert options
const alertOptions = {
  timeout: 3000,
  position: "top right"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              
              <div className="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" className="btn btn-sm btn-dark" ><i className="fas fa-bars"></i></a>
              <Header />
              <Alerts />
                <Switch>
                  <PrivateRoute exact path="/match" component={MatchesPage} />
                  <PrivateRoute exact path="/series" component={SeriesPage} />
                  <Route exact path="/" component={WelcomePage} />                  
                  <Route path="/livescene/:id" component={CasterPage} />
                  <Redirect exact from="/livescene" to="/livescene/1" />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
