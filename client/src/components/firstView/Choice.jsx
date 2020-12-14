import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  componentDidMount() {
    this.props.initiator(false);
  }
  render() {
    return (
      <div>
        <Link to="/send">
          <button
            onClick={() => {
              this.props.initiator(true);
            }}
          >
            SEND FILE
          </button>
        </Link>
        <Link to="/receive">
          <button>RECEIVE FILE</button>
        </Link>
      </div>
    );
  }
}
