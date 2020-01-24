import React, { Component } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CryptoJS from "crypto-js";

// Material Icons used on buttons https://material-ui.com/components/material-icons/
// yarn add @material-ui/core
// yarn add @material-ui/icons

class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      name: CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8),
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getHeart();
  }

  getHeart = () => {
    let data = new FormData();
    data.append("userName", this.state.name);
    fetch("http://localhost:8081/api/user/getfave", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ liked: response });
      })
      .catch(err => console.error(err));
  };

  handleClick = () => {
    let data = new FormData();
    data.append("userName", this.state.name);
    fetch("http://localhost:8081/api/user/setfave", {
      method: "PUT",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ liked: response });
        this.getHeart();
      })
      .catch(err => console.error(err));
  };

  render() {
    const label = this.state.liked ? <FavoriteIcon color="secondary" style={{ fontSize: 48 }} /> : <FavoriteBorderIcon style={{ fontSize: 48 }} />
    return (
      <>
        <div className="floatbox">
          <div className="wrapper">
            <div className="Likebutton-Container">
              <button className="Likebutton-btn" onClick={this.handleClick}>
                {label}</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default LikeButton
