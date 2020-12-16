import React, { Component } from "react";

export default class Inbox extends Component {
  render() {
    return (
      <div className="inbox">
        <p>Inbox</p>
        <div className="linkReceived">
          <input type="text" value={this.props.linkReceived} />
        </div>
        {this.props.gotFile ? (
          <div className="downloadFile">
            <button onClick={this.props.download}>Download</button>
          </div>
        ) : (
          <button disabled="disabled">No File</button>
        )}
      </div>
    );
  }
}
