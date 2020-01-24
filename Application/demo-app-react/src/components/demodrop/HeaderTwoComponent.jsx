import { withRouter } from "react-router";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';
import CryptoJS from "crypto-js";

import * as userActions from '../../redux/User/User.actions';
import AuthenticationService from "./AuthenticationService.js";
import logo from "./logo.png";

class HeaderTwoComponent extends Component {
  constructor() {
    super();
    this.state = {
      userRole: CryptoJS.AES.decrypt(
        sessionStorage.getItem("userRole"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8)
    };
  }  
 

  logOut(){
    AuthenticationService.logout()
    this.props.logout();
  }

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const isUserProducer = this.state.userRole;

    return (
      <header>
        <nav className="navbar navbar-custom navbar-expand-md on-top">
        <a href="/welcome"><img src={logo} className="App-logo" alt="logo"></img></a>

          <ul className="navbar-nav navbar-collapse justify-content-end">
          {isUserProducer==="administrator" && (
              <li>
                <Link
                  className="nav-link"
                  to="/users"
                >
                  Users
                </Link>
                </li>
          )}
                    {isUserProducer==="backoffice"&&  (
              <li>
                <Link
                  className="nav-link"
                  to="/audiolist"
                >
                  DemoDrops
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
            {isUserLoggedIn && (
              <li>
                <a href="https://www.dondiablo.com/" className="nav-link" target="_blank" rel="noopener noreferrer">
                don diablo • com
                </a>
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

const composeComponent= compose(
  connect(
    null,
    mapDispatchToProps
  )
)(HeaderTwoComponent);

export default withRouter(composeComponent)