import React, { Component } from "react";

import HeaderComponent from "./HeaderComponent.jsx";

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      nameAlreadyExists: false,
      emailAlreadyExists: false,
      signUpSuccesMessage: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    fetch("http://localhost:8081/api/user", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(response => {
      response.text().then(text => {
        console.log(text);
        if (text === "Name already exists!") {
          console.log(text);
          this.setState({ nameAlreadyExists: true });
          setTimeout(() => {
            this.setState({
              nameAlreadyExists: false
            });
          }, 5000);
        } else if (text === "Email already exists!") {
          console.log(text);
          this.setState({ emailAlreadyExists: true });
          setTimeout(() => {
            this.setState({
              emailAlreadyExists: false
            });
          }, 5000);
        } else if (text === "Registration NOT successfull") {
          console.log(text);
          this.setState({ signUpNotSuccessfull: true });
          setTimeout(() => {
            this.setState({
              signUpNotSuccessfull: false
            });
          }, 5000);
        } else {
          this.props.history.push(`/login`);
        }
      });
    });
  };

  render() {
    return (
      <div>
        <HeaderComponent />
        <section className="section-1"></section>
        <div className="centered on-top">
          <h1>register</h1>
          {this.state.nameAlreadyExists && (
            <div className="alert alert-warning">Username already exists!</div>
          )}
          {this.state.emailAlreadyExists && (
            <div className="alert alert-warning">Email already exists!</div>
          )}
          {this.state.signUpNotSuccessfull && (
            <div className="alert alert-warning">Sign Up Not Successfull!</div>
          )}
          <p className="underline t-center">
            already have an account? <a href="/login">sign in</a>
          </p>
          <div className="container box-background">
            <input
              type="text"
              className="form-control margin-top-20"
              placeholder="Username"
              name="name"
              onChange={this.handleChange}
            />
            <input
              type="text"
              className="form-control margin-top-20"
              placeholder="Email"
              name="email"
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
              Sign Up
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupComponent;
