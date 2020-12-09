import React, { Component } from "react";

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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="otp">
            <input
              type="text"
              name="otp"
              id="otp"
              onChange={this.handleChange}
              value={this.state.otp}
            />
          </label>
          <input type="submit" value="PAIR" />
        </form>
      </div>
    );
  }
}
