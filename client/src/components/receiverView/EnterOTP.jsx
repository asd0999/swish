import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import Connecting from "../commonView/Connecting";
// import PageHeading from "../commonView/PageHeading";
// import { Spring } from "react-spring/renderprops";

let self;

export default class EnterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      verifyingOTP: false,
      wrongOnce: false,
    };
    self = this;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log("now");
    if (this.props.wrongOTP) {
      this.setState({
        verifyingOTP: false,
      });
    }
  }

  handleClick(e) {
    // console.log("clicked");
    // console.log(e.target.value);
    e.target.placeholder = "";
    this.setState({
      verifyingOTP: false,
      wrongOnce: true,
    });
    this.props.resetWrongOTP();
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
      verifyingOTP: true,
    });
  }

  render() {
    return (
      <>
        <h2>Device pairing</h2>
        {this.props.wrongOTP ? (
          <>
            {self.state.wrongOnce ? (
              <span className="instruction">
                Incorrect OTP, could not pair devices
              </span>
            ) : (
              <span className="instruction">
                Enter OTP from the other device here
              </span>
            )}
            <form onSubmit={this.handleSubmit}>
              <label className="label-OTP-input" htmlFor="otp">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  onClick={this.handleClick}
                  onChange={this.handleChange}
                  value={this.state.otp}
                  placeholder="Enter OTP"
                />
              </label>
              <input id="pairBtn" type="submit" value="PAIR" />
            </form>
          </>
        ) : this.state.verifyingOTP ? (
          <>
            <span className="instruction">Verifying OTP</span>
            <Connecting peerConnection={this.props.peerConnection} />
          </>
        ) : (
          <>
            <span className="instruction">
              Enter OTP from the other device here
            </span>
            <form onSubmit={this.handleSubmit}>
              <label className="label-OTP-input" htmlFor="otp">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  onClick={this.handleClick}
                  onChange={this.handleChange}
                  value={this.state.otp}
                  placeholder="Enter OTP"
                />
              </label>
              <input id="pairBtn" type="submit" value="PAIR" />
            </form>
          </>
        )}
      </>
    );
  }
}
