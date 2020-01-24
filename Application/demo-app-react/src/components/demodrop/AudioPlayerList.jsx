import React, { Component } from "react";
import AudioPlayer from "./AudioPlayer.jsx";
import CryptoJS from "crypto-js";

class AudioPlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      userName: CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8),
      oldCount: 0
    };
  }



  // Softdelete button | Boolean
  handleDelete = fileId => {
    console.log("Delete File #" + fileId);
    fetch("http://localhost:8081/api/file/softdelete/" + fileId, {
      method: "PUT",
      body: JSON.stringify({ softdeleted: true }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log("#" + fileId + " softdeleted.");
        this.makePlaylist();
      })
      .catch(err => {
        console.log(err);
      });
  };


  //Process button | song is processed | boolean
  handleProces = fileId => {
    console.log("Process File #" + fileId);
    fetch("http://localhost:8081/api/file/processed/" + fileId, {
      method: "PUT",
      body: JSON.stringify({ processed: true }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log("#" + fileId + " processed.");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDownload = fileId => {
    console.log("handleDownload clicked");
    const url = "http://localhost:8081/api/file/";
    fetch(url + fileId)
      .then(response => {
        response.blob();
        window.location.href = response.url;
      })
      .then(() => {
        console.log("#" + fileId + " downloaded.");
      })
      .catch(err => console.error(err));
  };


  compareCounts = () => {
    if (this.state.oldCount !== this.props.count) {
      this.makePlaylist();
      this.setState({
        oldCount: this.props.count
      });
    }
  };


  componentDidMount() {
    this.makePlaylist();
  }

  makePlaylist = () => {
    let data = new FormData();
    data.append("userName", this.state.userName);
    console.log(this.state.userName);
    const self = this;
    fetch("http://localhost:8081/api/file/usersongs", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        self.setState({ files: response });
      })
      .catch(err => console.error(err));
  }

  render() {
    setInterval(() => this.compareCounts(), 1000);
    return (
      <>
        <div className="background-box">
          <div className="container">
            {this.state.files.reverse().map(item => {
              if (!item.processed && !item.softdeleted) {
                return (
                  <>


                    <div className="inner-box border-box-pink">
                      <div>
                        <AudioPlayer item={item} key={item.id} />


                        <div className="padding">
                          <button className="btn btn-outline-light btn-sm"
                            onClick={() => this.handleProces(item.id)}>
                            proces
                  </button>
                        </div>
                        <div className="padding">
                          <button className="btn btn-outline-light btn-sm"
                            onClick={() => this.handleDownload(item.id)}>
                            download
                  </button>
                        </div>
                        <div className="padding">
                          <button className="btn btn-outline-light btn-sm"
                            onClick={() => this.handleDelete(item.id)}>
                            delete
                  </button>
                        </div>
                      </div>
                    </div>


                  </>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  }
}

export default AudioPlayerList;

