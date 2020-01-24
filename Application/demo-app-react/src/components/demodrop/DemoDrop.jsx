import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import SignupComponent from "./SignupComponent.jsx";
import FileUpload from "./FileUpload.jsx";
import AudioPlayerList from "./AudioPlayerList.jsx";
import Users from "./Users.jsx";
import AudioPlayerListAll from "./AudioPlayerListAll.jsx";

import store from "../../redux";
import ProfileComponent from "./ProfileComponent.jsx";


class DemoDrop extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="DemoDrop">
          <Router>
            <>
              <Switch>
                <Route path="/" exact component={LoginComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/signup" component={SignupComponent} />
                <Route path="/fileupload" component={FileUpload} />
                <Route path="/player" component={AudioPlayerList} />
                <Route path="/users" component={Users} />
                <Route path="/profile/:name" component={ProfileComponent} />
                <Route path="/audiolist" component={AudioPlayerListAll} />
                <AuthenticatedRoute
                  path="/welcome"
                  component={WelcomeComponent}
                />
                <AuthenticatedRoute
                  path="/logout"
                  component={LogoutComponent}
                />

                <Route component={ErrorComponent} />
              </Switch>
            </>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default DemoDrop;
