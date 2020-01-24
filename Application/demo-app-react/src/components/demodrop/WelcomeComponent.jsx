import React, { Component } from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import CryptoJS from "crypto-js";

import AudioPlayerList from "./AudioPlayerList.jsx";
import FileUpload from "./FileUpload.jsx";
import HeaderTwoComponent from "./HeaderTwoComponent.jsx";
import Likebutton from "./Likebutton.jsx";
import dondiablo from "./dondiablo.png"
import ProfileComponent from "./ProfileComponent.jsx";

// { this.props.user.user && this.props.user.user.admin ? <Link>downloadknop</Link> : null } REDUX


class WelcomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      userRole: CryptoJS.AES.decrypt(
        sessionStorage.getItem("userRole"),
        "Secret Passphrase"
      ).toString(CryptoJS.enc.Utf8),
    };
  }

  changeCount = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        count: prevState.count + 1
      };
    });
  };


  render() {
    const isUserProducer = this.state.userRole;
    let username = sessionStorage.getItem("authenticatedUser");
    var decrypted = CryptoJS.AES.decrypt(username, "Secret Passphrase");
    var decryptedName = decrypted.toString(CryptoJS.enc.Utf8);
    return (
      <div className="background-box height-full">
      <HeaderTwoComponent />
        <div className="background-box">
        <div className="container">
        <p className="welcome t-left margin-bottom-20">Hi {this.props.user.user ? decryptedName : null}! Welcome to the Don Diablo DemoDrop.</p>
       
         <div className="d-flex">
    <div className="col-md-8">
    <AudioPlayerList count={this.state.count} />
    <ProfileComponent />
    </div>
    <div className="col-md-4"><FileUpload changeCount={this.changeCount} className="margin-20"/>
    </div>
  </div>

  </div>
        </div>
        {isUserProducer!=="producer" &&(
        <Likebutton>)}
       
        </Likebutton>)}

        <div className="image-box-fixed">
          <div className="image-inner-box">
    <img src={dondiablo} className="image-fixed" alt="don-diablo"></img>
        </div>
        </div>

        </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user
});

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(WelcomeComponent);