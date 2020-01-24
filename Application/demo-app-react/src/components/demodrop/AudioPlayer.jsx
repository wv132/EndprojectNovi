import React, { Component } from "react";
import Comment from "./Comment";
import CryptoJS from "crypto-js";

class AudioPlayer extends Component {
  constructor() {
    super();
    this.state = {
      commentList: [],
      body: "",
      userName: CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase",

      ).toString(CryptoJS.enc.Utf8),
      userRole: CryptoJS.AES.decrypt(
        sessionStorage.getItem("userRole"),
        "Secret Passphrase",

      ).toString(CryptoJS.enc.Utf8),
    };
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    let data = new FormData();
    data.append("fileId", this.props.item.id);
    const self = this;
    fetch("http://localhost:8081/api/file/comments", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        self.setState({ commentList: response });
      })
      .catch(err => console.error(err));
  };

  handleSubmit = () => {
    let data = new FormData();
    data.append("fileId", this.props.item.id);
    data.append("userName", this.state.userName);
    data.append("body", this.state.userName + ": " + this.state.body);
    fetch("http://localhost:8081/api/comment/upload", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => console.error(err));
  };

  handleClick = () => {
    this.handleSubmit();
    setTimeout(() => {
      this.loadComments();
    }, 100);
  };


  render() {
    const isUserProducer = this.state.userRole;
    return (

      <div className="inline">
        <div className="container-audio">
          <audio controls>
            <source
              src={"http://localhost:8081/api/file/" + this.props.item.id}
              type="audio/mpeg"
            ></source>
          </audio>
        </div>

        <div className="audioplayer-text f-size-12 light-blue uppercase margin-top-6">
          {this.props.item.name}
        </div>
        <div className="audioplayer-text f-size-11 light-pink margin-top-6">
          About: {this.props.item.description}
        </div>
        <div className="underline margin-top-20">
          {this.state.commentList.map(item => {
            return <Comment item={item} key={item.id} />;
          })}
        </div>


        {isUserProducer !== "producer" && (<div className="padding">
          <select
            name="body"
            className="inline form-control form-control-sm dropdown"
            onChange={event => {
              this.setState({ body: event.target.value });
            }}
          >
            <option value=" ">Choose</option>
            <option value="We're very impressed by your demo. Can you please send us more demo's so we can check out your work.">Maybe</option>
            <option value="We're feelin' it! Please continue your efforts and drop your progression in future.">Future</option>
            <option value="Thx for your drop! Unfortunately not the sound we're looking for.">Reject</option>
            <option value="You are a true Hexagonian! Your demo is godlike! We will contact you soon.">Contact</option>
            <option value="No words.. Don Diablo himself will soon contact you!!">Don Diablo</option>
          </select>
        </div>
        )}

        {isUserProducer !== "producer" && (<div className="padding">
          <button className="btn btn-outline-light btn-sm"
            onClick={this.handleClick}>
            add comment
        </button>
        </div>
        )}



      </div>
    );
  }
}

export default AudioPlayer;
