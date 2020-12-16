import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Inbox extends Component {
  render() {
    return (
      <div className="inbox">
        <p>Inbox</p>
        <div className="linkReceived">
          <Link href={this.props.linkReceived}>
            <input
              type="text"
              value={this.props.linkReceived}
              placeholder="no link"
            />
          </Link>
        </div>
        {this.props.gotFile ? (
          <div className="downloadFile">
            <button onClick={this.props.download}>Got file!</button>
          </div>
        ) : (
          <button className="noFile">No File</button>
        )}
      </div>
    );
  }
}
