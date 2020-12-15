import React, { Component } from "react";

export default class PageHeading extends Component {
  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <h2>OTP verified</h2>
        ) : (
          <h2>Device pairing</h2>
        )}
      </div>
    );
  }
}
