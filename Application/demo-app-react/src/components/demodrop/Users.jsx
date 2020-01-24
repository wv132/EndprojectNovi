import React, { Component } from "react";
import HeaderTwoComponent from "./HeaderTwoComponent.jsx";
import ChangeRole from "./ChangeRole";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }
  myFunction = () => {
    console.log("Search input....");
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  handleDelete = userId => {
    console.log("Delete user #" + userId);
    fetch("http://localhost:8081/api/user/" + userId, {
      method: "DELETE"
    })
      .then(() => {
        console.log("#" + userId + " removed.");
      })
      .catch(err => {
        console.log(err);
      });
    alert("User " + this.state.users.user.name + " is deleted!");
    window.location.reload(false);
  };

  handleBlock = userId => {
    console.log("Block user #" + userId);
    fetch("http://localhost:8081/api/user/active/" + userId, {
      method: "PUT",
      body: JSON.stringify({ active: false }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log("#" + userId + " blocked.");
      })
      .catch(err => {
        console.log(err);
      });
    alert("User " + this.state.users.name + " is blocked!");
    window.location.reload(false);
    console.log("users: ");
  };
  handleActivate = userId => {
    console.log("Activate user #" + userId);
    fetch("http://localhost:8081/api/user/active/" + userId, {
      method: "PUT",
      body: JSON.stringify({ active: true }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log("#" + userId + " Activated.");
      })
      .catch(err => {
        console.log(err);
      });
    alert("User " + this.state.users.name + " is activated!");
    window.location.reload(false);
  };

  componentDidMount = () => {
    const url = "http://localhost:8081/api/user";
    fetch(url)
      .then(response => response.json())
      .then(users => {
        this.setState({
          users: users
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    console.log("Users - Rendered");
    const Search = (
      <input
        type="text"
        id="myInput"
        onKeyUp={this.myFunction}
        placeholder="Search for usernames.."
      ></input>
    );
    const tableRows = this.state.users.map((user, index) => (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.role}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.active ? "true" : "false"}</td>
        <td>
          <button
            className="badge badge-danger m-1"
            onClick={() => this.handleBlock(user.id)}
          >
            BLOCK
          </button>
          <button
            className="badge badge-success m-1"
            onClick={() => this.handleActivate(user.id)}
          >
            ACTIVATE
          </button>
        </td>
      </tr>
    ));
    return (
      <>
        <div className="background-box">
          <HeaderTwoComponent />
          <div className="background-box-white">
            <div className="App margin-r-l-u" style={{ backGroundColor: "black" }}>
              <h3>Userlist table</h3>
              <ChangeRole />
              <div>{Search}</div>
              <br />

              <table id="table" className="table">
                <thead style={{ fontWeight: "bold" }}>
                  <td>ID</td>
                  <td>Role</td>
                  <td>USERNAME</td>
                  <td>EMAIL</td>
                  <td>ACTIVE</td>
                  <td style={{ textAlign: "center" }}>ACTION</td>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </ >
    );
  }
}

export default Users;
