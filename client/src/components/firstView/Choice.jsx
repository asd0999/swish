import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  render() {
    return (
      <div>
        <Link to="/send">
          <button>SEND FILE</button>
        </Link>
        <Link to="/receive">
          <button>RECEIVE FILE</button>
        </Link>
      </div>
    );
  }
}
