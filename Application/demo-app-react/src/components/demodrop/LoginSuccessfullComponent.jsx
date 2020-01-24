import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginSuccessfull extends Component {
  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome. You can manage your demos <Link to="/demodrop">here</Link>.
        </div>
      </>
    );
  }
}

export default LoginSuccessfull;
