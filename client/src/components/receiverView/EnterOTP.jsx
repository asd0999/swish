import React, { Component } from "react";
import Message from "../firstView/Message";

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
    // this.props.callPeer();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <span>Peer connnection established</span>
            <p></p>
            {/* <Message sendMessage={this.props.sendMessage} /> */}
            {this.props.gotFile ? (
              <>
                <span>You have received a file</span>
                <button onClick={this.props.download}>Download</button>
              </>
            ) : null}
          </>
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
