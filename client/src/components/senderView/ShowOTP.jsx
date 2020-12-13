import React, { Component } from "react";
import FileTransfer from "../firstView/FileTransfer";

export default class ShowOTP extends Component {
  componentDidMount() {
    this.props.requestOTP();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <FileTransfer
            selectFile={this.props.selectFile}
            sendFile={this.props.sendFile}
            download={this.props.download}
            sendMessage={this.props.sendMessage}
            gotFile={this.props.gotFile}
          />
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
