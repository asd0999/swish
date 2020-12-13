import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ShowOTP extends Component {
  componentDidMount() {
    this.props.requestOTP();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <Redirect to="/connected" />
        ) : (
          <>
            <h1>{this.props.otp}</h1>
            <button onClick={this.props.requestOTP}>Refresh OTP</button>
          </>
        )}
      </div>
    );
  }
}
