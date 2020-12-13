import React, { Component } from "react";
import FileTransfer from "../firstView/FileTransfer";

export default class EnterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.pairPeers(this.state.otp);
    this.setState({
      otp: "",
    });
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
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="otp">
              <input
                type="text"
                name="otp"
                id="otp"
                onChange={this.handleChange}
                value={this.state.otp}
                placeholder="Enter OTP"
              />
            </label>
            <input type="submit" value="PAIR" />
          </form>
        )}
      </div>
    );
  }
}
