import React, { Component } from "react";
import Connecting from "../commonView/Connecting";

export default class SendFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferingFile: false,
    };
    this.clearFile = this.clearFile.bind(this);
    this.fileUploaded = this.fileUploaded.bind(this);
    this.triggerSendFile = this.triggerSendFile.bind(this);
  }

  clearFile() {
    console.log("file cleared");
    document.getElementById("select-file-input").value = "";
    let f = document.querySelector(".custom-file-input");
    f.setAttribute("id", "");
    this.props.resetFile();
  }

  triggerSendFile() {
    this.props.sendFile();
    this.setState({
      transferingFile: true,
    });
    let f = document.querySelector(".custom-file-input");
    f.setAttribute("id", "");
  }

  fileUploaded(event) {
    this.props.selectFile(event);
    let f = document.querySelector(".custom-file-input");
    f.setAttribute("id", "file-uploaded");
  }

  render() {
    return (
      <>
        <>
          {this.props.file && !this.props.fileTransferComplete ? (
            this.state.transferingFile ? (
              <Connecting peerConnection={this.props.peerConnection} />
            ) : (
              <>
                <label
                  htmlFor="select-file-input"
                  className="custom-file-input"
                  id="file-uploaded"
                >
                  <div id="fileIcon">
                    <img src="../file-icon.png" alt="file icon" />
                  </div>
                  <span>{this.props.file.name}</span>
                </label>
              </>
            )
          ) : (
            <label htmlFor="select-file-input" className="custom-file-input">
              Share file
            </label>
          )}
          <input
            type="file"
            id="select-file-input"
            onChange={(event) => {
              this.fileUploaded(event);
            }}
          />
        </>
        {this.props.file && !this.props.fileTransferComplete ? (
          <div id="dialog-footer">
            <button id="ok-button" onClick={this.triggerSendFile}>
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
        ) : null}
      </>
    );
  }
}
