import React, { Component } from "react";
import CryptoJS from "crypto-js";
import Button from "@material-ui/core/Button";
import CloudIcon from "@material-ui/icons/Cloud";
import InstagramIcon from '@material-ui/icons/Instagram';


class ProfileComponent extends Component {
  constructor() {
    super();

    this.state = {
      djName: "",
      isDjNameFilled: false,
      about: "",
      isAboutFilled: false,
      musicStyle: "",
      isMusicStyleFilled: false,
      instagram: "",
      isInstagramFilled: false,
      soundcloud: "",
      isSoundcloudFilled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.setInfo = this.setInfo.bind(this);
  }



  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.loadInfoUser();
    this.emptyCheck();
  }

  loadInfoUser = () => {
    let data = new FormData();
    data.append(
      "userName",
      CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8)
    );
    fetch("http://localhost:8081/api/user/getinfo", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response =>
        this.setState({
          about: response[0],
          djName: response[1],
          musicStyle: response[2],
          instagram: response[3],
          soundcloud: response[4]
        })
      )
      .catch(err => console.error(err));
  };

  emptyCheck = () => {
    let data = new FormData();
    data.append(
      "userName",
      CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8)
    );
    fetch("http://localhost:8081/api/user/getinfo", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        if (response[1] !== "") {
          this.setState({
            isDjNameFilled: true
          });
        }
        if (response[0] !== "") {
          this.setState({
            isAboutFilled: true
          });
        }
        if (response[2] !== "") {
          this.setState({
            isMusicStyleFilled: true
          });
        }
        if (response[3] !== "") {
          this.setState({
            isInstagramFilled: true
          });
        }
        if (response[4] !== "") {
          this.setState({
            isSoundcloudFilled: true
          });
        }
      })
      .catch(err => console.error(err));
  };


  setInfo() {
    let data = new FormData();
    data.append(
      "userName",
      CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8)
    );
    data.append("djName", this.state.djName);
    data.append("about", this.state.about);
    data.append("musicStyle", this.state.musicStyle);
    data.append("instagram", this.state.instagram);
    data.append("soundcloud", this.state.soundcloud);
    fetch("http://localhost:8081/api/user/setinfo", {
      method: "PUT",
      body: data
    })
      .then(response => response.json())
      .catch(err => console.error(err));
    this.checkIfEmpty();
  }

  checkIfEmpty = () => {
    if (this.state.djName !== "") {
      this.setState({
        isDjNameFilled: true
      });
    }
    if (this.state.about !== "") {
      this.setState({
        isAboutFilled: true
      });
    }
    if (this.state.musicStyle !== "") {
      this.setState({
        isMusicStyleFilled: true
      });
    }
    if (this.state.instagram !== "") {
      this.setState({
        isInstagramFilled: true
      });
    }
    if (this.state.soundcloud !== "") {
      this.setState({
        isSoundcloudFilled: true
      });
    }
  };


  render() {
    var djNameIsEmpty = true;
    if (this.state.djName !== "" && this.state.isDjNameFilled === true) {
      djNameIsEmpty = false;
    }
    var aboutIsEmpty = true;
    if (this.state.about !== "" && this.state.isAboutFilled === true) {
      aboutIsEmpty = false;
    }
    var musicStyleIsEmpty = true;
    if (
      this.state.musicStyle !== "" &&
      this.state.isMusicStyleFilled === true
    ) {
      musicStyleIsEmpty = false;
    }
    var instagramIsEmpty = true;
    if (this.state.instagram !== "" && this.state.isInstagramFilled === true) {
      instagramIsEmpty = false;
    }
    var soundcloudIsEmpty = true;
    if (
      this.state.soundcloud !== "" &&
      this.state.isSoundcloudFilled === true
    ) {
      soundcloudIsEmpty = false;
    }
    var showButton = true;
    if (
      djNameIsEmpty === false &&
      aboutIsEmpty === false &&
      musicStyleIsEmpty === false &&
      instagramIsEmpty === false &&
      soundcloudIsEmpty === false
    ) {
      showButton = false
    }


    return (
      <>
        <div className="margin-top-60 max-w-70">
          {djNameIsEmpty && (
            <input
              type="text"
              className="form-control margin-top-20"
              placeholder="your DJ name"
              name="djName"
              onChange={this.handleChange.bind(this)}
            />
          )}
          {!djNameIsEmpty && (
            <p className="profile">{"My DJ name: " + this.state.djName}</p>
          )}


          {musicStyleIsEmpty && (
            <input
              type="text"
              className="form-control margin-top-20"
              placeholder="your music genre"
              name="musicStyle"
              onChange={this.handleChange.bind(this)}
            />
          )}
          {!musicStyleIsEmpty && (
            <p className="profile">{"My music genre: " + this.state.musicStyle}</p>
          )}

          {aboutIsEmpty && (
            <textarea
              type="text"
              maxLength="220"
              rows="3"
              className="form-control margin-top-20"
              placeholder="your story"
              name="about"
              onChange={this.handleChange.bind(this)}
            />
          )}
          {!aboutIsEmpty && <p className="profile">{"My story: " + this.state.about}</p>
          }

          <div className="block">
            {instagramIsEmpty && (
              <input
                type="text"
                className="form-control margin-top-20"
                placeholder="your Instagram name"
                name="instagram"
                onChange={this.handleChange.bind(this)}
              />
            )}
            {!instagramIsEmpty && (

              <Button href={"https://instagram.com/" + this.state.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="default"
                className="padding-5"
                startIcon={<InstagramIcon />}
              >
                Instagram
        </Button>

            )}
            {soundcloudIsEmpty && (
              <input
                type="text"
                className="form-control margin-top-20"
                placeholder="your SoundCloud name"
                name="soundcloud"
                onChange={this.handleChange.bind(this)}
              />
            )}
            {!soundcloudIsEmpty && (

              <Button href={"https://soundcloud.com/" + this.state.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="default"
                className="padding-5"
                startIcon={< CloudIcon />}
              >
                SoundCloud
        </Button>

            )}
          </div>
          {showButton && (
            <div className="margin-left-20">
              <button
                className="btn btn-outline-light btn-sm margin-top-20"
                onClick={this.setInfo}
              >
                Save Info
        </button>
            </div>
          )}
        </div>
      </ >
    );
  }
}


export default ProfileComponent;
