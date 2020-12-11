import React, { Component } from "react";

export default class SendFile extends Component {
  render() {
    return (
      <div id="select-file-dialog">
        <div id="dialog-content">
          <div id="select-file">
            <div id="label">Select a file:</div>
            <input
              type="file"
              id="select-file-input"
              onChange={this.props.selectFile}
            />
          </div>
          <div id="dialog-footer">
            <button id="ok-button" onClick={this.props.sendFile}>
              Send
            </button>
            <button id="cancel-button" className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
