import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent.jsx";
import * as userActions from "../../redux/User/User.actions";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      hasLoginFailed: false,
      showSuccesMessage: false,
      role: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getRole = () => {
    fetch("http://localhost:8081/api/user/getrole/" + this.state.name, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.text().then(role =>{
          AuthenticationService.registerSuccesfulLogin(
            this.state.name,
            role
          );
          this.setState({ role });
          this.props.history.push(`/welcome`);
        });

      })
      .catch(err => console.error(err));
  };

  loginClicked(response) {
    setTimeout(() => {
      if (response === true) {
        this.getRole();
      } else if (response === false) {
        console.log("Failed");
        this.setState({ showSuccesMessage: false });
        this.setState({ hasLoginFailed: true });
      } else {
        console.log("Doesn't work");
      }
    }, 100);
  }

  handleSubmit = event => {
    event.preventDefault();

    var user = {
      name: this.state.name,
      password: this.state.password
    };
    fetch("http://localhost:8081/api/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        const userObject = {
          id: null,
          name: this.state.name,
          role: this.state.role,
        };
        console.log(response);

        this.props.setUser(userObject);
        this.loginClicked(response);
      });
  };

  render() {
    return (
      <div>
      <HeaderComponent />
      <section className="section-1"></section>
      <div className="centered on-top">
        <h1>sign in</h1>
        <p className="underline t-center">new user? <a href="/signup">create an account</a></p>
        <div className="container box-background">
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {this.state.showSuccesMessage && <div>Login Succesful</div>}
          <input
            type="text"
            className="form-control margin-top-20"
            placeholder="Username"
            name="name"
            onChange={this.handleChange}
          />
          <input
            type="password"
            className="form-control margin-top-20"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
          <button
            className="btn btn-outline-light btn-lg btn-block margin-top-20"
            onClick={this.handleSubmit}
          >
            continue
          </button>
        </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(userActions.setUser(user)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(LoginComponent);