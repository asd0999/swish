import React, { Component } from "react";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
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
    this.props.sendMessage(this.state.message);
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="message">
            <input
              type="text"
              name="message"
              id="message"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </label>
          <input type="submit" value="SEND" />
        </form>
      </div>
    );
  }
}
