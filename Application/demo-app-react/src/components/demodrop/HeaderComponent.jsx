import { withRouter } from "react-router";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../redux/User/User.actions';
import AuthenticationService from "./AuthenticationService.js";
import logo from "./logo.png";

class HeaderComponent extends Component {
  componentDidMount() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    if (isUserLoggedIn) {
      this.props.setUser({ id: null, name: AuthenticationService.getLoggedInUserName(), permissions: { canDownload: true } })
    }
  }

  logOut() {
    AuthenticationService.logout()
    this.props.logout();
  }

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
      <header>
        <nav className="navbar navbar-expand-md on-top">
          <a href="/welcome"><img src={logo} className="App-logo" alt="logo"></img></a>

          <ul className="navbar-nav navbar-collapse justify-content-end">
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="https://www.dondiablo.com/" target="_blank" rel="noopener noreferrer">
                  don diablo • com
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={() => this.logOut()}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(userActions.setUser(user)),
  logout: () => dispatch(userActions.logout()),
});

const composeComponent = compose(
  connect(
    null,
    mapDispatchToProps
  )
)(HeaderComponent);

export default withRouter(composeComponent)