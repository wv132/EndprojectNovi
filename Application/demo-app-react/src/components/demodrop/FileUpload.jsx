import React, { Component } from "react";
import CryptoJS from "crypto-js";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      description: "",
      userName: CryptoJS.AES.decrypt(
        sessionStorage.getItem("authenticatedUser"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8)
    };
  }


  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("file", this.state.file);
    data.append("description", this.state.description);

    data.append("userName", this.state.userName);
    console.log(this.state.userName);

    fetch("http://localhost:8081/api/file/upload", {
      method: "POST",
      body: data
    })
      .then(res => {
        if (res.ok) {
          console.log(res.data);


          alert("File uploaded successfully.");
          this.props.changeCount();
          this.props.history.push(`/player`);
        } else {
          console.log(res);
          alert("Error uploading file. \nTry again.\n" + res);
        }
      })

      .catch(err => console.error(err));
  };

  render() {
    console.log("FileUpload - Rendered");
    return (
      <>

        <div className="background-box">
          <div className="wrapper">
            <div className="inner-box border-box">
              <div className="wrapper-center">
                <div className="file-upload">

                  <input
                    type="file"
                    placeholder="Select File"
                    name="file"
                    accept=".mp3"
                    onChange={event => {
                      this.setState({
                        file: event.target.files[0]
                      });
                    }}
                  />

                  <ArrowUpwardIcon style={{ fontSize: 48 }} />
                </div>
              </div>

              <br />
              <textarea
                type="text"
                maxLength="220"
                className="form-control"
                rows="2"
                placeholder="Tell us all about your demo"
                name="description"
                onChange={event => {
                  this.setState({ description: event.target.value });
                }}
              />
              <br />

              <button className="btn btn-outline-light btn-lg btn-block"
                onClick={this.handleSubmit}>
                drop demo
          </button>
              <p className="footnote white">max.15MB<br />mp3 only
          </p>
            </div>
          </div>
        </div>



      </>
    );
  }
}

export default FileUpload;
