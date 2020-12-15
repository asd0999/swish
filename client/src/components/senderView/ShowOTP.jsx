import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import Connecting from "../commonView/Connecting";
import PageHeading from "../commonView/PageHeading";

export default class ShowOTP extends Component {
  componentDidMount() {
    this.props.requestOTP();
    this.props.initiator(true);
  }

  render() {
    return (
      <>
        <PageHeading peerConnection={this.props.peerConnection} />
        {this.props.peerConnection ? (
          // <Redirect to="/connecting" />
          <>
            <span className="instruction">Setting up P2P connection</span>
            <Connecting />
          </>
        ) : (
          <>
            <span className="instruction">
              Enter this OTP on your other device
            </span>
            <h1 className="otp">{this.props.otp}</h1>
            <button className="refresh-otp" onClick={this.props.requestOTP}>
              Refresh OTP
            </button>
          </>
        )}
      </>
    );
  }
}
