import React, { Component } from "react";

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
        <h1>{this.props.otp}</h1>
        <button onClick={this.props.requestOTP}>Refresh OTP</button>
      </div>
    );
  }
}
