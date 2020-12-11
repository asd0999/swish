import React, { Component } from "react";
import Message from "../firstView/Message";
import SendFile from "../firstView/SendFile";

export default class ShowOTP extends Component {
  componentDidMount() {
    this.props.requestOTP();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <span>Peer connnection established</span>
            <p></p>
            <SendFile
              selectFile={this.props.selectFile}
              sendFile={this.props.sendFile}
            />
            <p></p>
            <span>Send an instant message</span>
            <Message sendMessage={this.props.sendMessage} />
          </>
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
