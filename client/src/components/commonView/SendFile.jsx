import React, { Component } from "react";

export default class SendFile extends Component {
  constructor(props) {
    super(props);
    this.clearFile = this.clearFile.bind(this);
  }

  clearFile() {
    document.getElementById("select-file-input").value = "";
    this.props.resetFile();
  }

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
            <button
              id="cancel-button"
              className="cancel-button"
              onClick={this.clearFile}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
