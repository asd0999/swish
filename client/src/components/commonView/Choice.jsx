import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <p>You are still connected to the device</p>
            <button onClick={this.props.refreshPage}>
              CONNECT ANOTHER DEVICE
            </button>
            <Link to="/connected">
              <button>RETURN TO TRANSFER PAGE</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/send">
              <button>SEND</button>
            </Link>
            <Link to="/receive">
              <button>RECEIVE</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}
