import React, { Component } from "react";

class ChangeRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("userName", this.state.userName);
    console.log(this.state.userName);

    fetch("http://localhost:8081/api/user/role", {
      method: "Put",
      body: data
    })
      .then(res => {
        if (res.ok) {
          console.log(res.data);
          alert("User Role Changed");
        } else {
          console.log(res);
          alert("User Role NOT changed" + res);
        }
      })

      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <h6>Change Role of User</h6>
        <form>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            onChange={event => {
              this.setState({ userName: event.target.value });
            }}
          />
          <br />

          <button className="badge badge-primary margin-bottom-20" onClick={this.handleSubmit}>
            Change Role
          </button>
        </form>
      </div>
    );
  }
}

export default ChangeRole;
