import React, { Component } from "react";
import Message from "../firstView/Message";

export default class ShowOTP extends Component {
  // constructor(props){
  //     super(props);
  // }

  componentDidMount() {
    this.props.requestOTP();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <span>Peer connnection established</span>
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
