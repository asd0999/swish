import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import Connecting from "../commonView/Connecting";
import PageHeading from "../commonView/PageHeading";
import { Spring } from "react-spring/renderprops";

export default class EnterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.wrongOTP) {
      const btn = document.querySelector("#pairBtn");
      btn.classList.add("shake");
      btn.addEventListener("animationend", function () {
        btn.classList.remove("shake");
      });
    }
  }

  handleClick(e) {
    // console.log("clicked");
    // console.log(e.target.value);
    e.target.placeholder = "";
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
              {this.props.wrongOTP ? (
                <Spring
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  config={{ duration: 200 }}
                >
                  {(props) => (
                    <div className="extra-div" style={props}>
                      <input id="pairBtn" type="submit" value="TRY AGAIN" />
                    </div>
                  )}
                </Spring>
              ) : (
                <input id="pairBtn" type="submit" value="PAIR" />
              )}
            </form>
          </>
        )}
      </>
    );
  }
}
