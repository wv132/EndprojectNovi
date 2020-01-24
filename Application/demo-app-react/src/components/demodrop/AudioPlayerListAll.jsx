import React, { Component } from "react";
import AudioPlayer from "./AudioPlayer.jsx";
import HeaderTwoComponent from "./HeaderTwoComponent.jsx";

class AudioPlayerListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
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
      })
      .catch(err => {
        console.log(err);
      });
    this.componentDidMount();
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

  componentDidMount() {
    console.log(this.state.userName);
    const self = this;
    fetch("http://localhost:8081/api/file/all")
      .then(response => response.json())
      .then(response => {
        self.setState({ files: response });
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log("List of files");
    return (
      <>
        <div className="background-box">
          <HeaderTwoComponent />
          <div className="background-box">
            <div className="container">

              <div className="d-flex">
                <div className="col-md-4">
                  <h1 className="title-size">List uploads of all producers</h1>
                </div>
                <div className="col-md-8">



                  {this.state.files.map(item => {
                    if (!item.processed && !item.softdeleted) {
                      return (
                        <>
                          <div className="inner-box border-box-pink">
                            <div style={{ color: "white" }}>{item.userName}</div>
                            <div>
                              <AudioPlayer item={item} key={item.id} />
                              <div className="padding">
                                <button
                                  className="btn btn-outline-light btn-sm"
                                  onClick={() => this.handleProces(item.id)}
                                >
                                  proces
                          </button>
                              </div>
                              <div className="padding">
                                <button
                                  className="btn btn-outline-light btn-sm"
                                  onClick={() => this.handleDownload(item.id)}
                                >
                                  download
                          </button>
                              </div>
                              <div className="padding">
                                <button
                                  className="btn btn-outline-light btn-sm"
                                  onClick={() => this.handleDelete(item.id)}
                                >
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

            </div>
          </div>

        </div>
      </>
    );
  }
}

export default AudioPlayerListAll;
