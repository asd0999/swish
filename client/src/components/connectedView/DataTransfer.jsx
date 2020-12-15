import React, { Component } from "react";
import SendLink from "./SendLink";
import SendFile from "./SendFile";
import { Redirect } from "react-router-dom";

export default class DataTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileInput: true,
      showLinkInput: false,
    };
    // this.showLinkInput = this.showLinkInput.bind(this);
    // this.showFileInput = this.showFileInput.bind(this);
  }

  // showFileInput() {
  //   if (this.state.showFileInput === false) {
  //     this.setState({
  //       showFileInput: true,
  //       showLinkInput: false,
  //     });
  //   } else {
  //     this.setState({
  //       showFileInput: false,
  //       showLinkInput: true,
  //     });
  //   }
  // }

  // showLinkInput() {
  //   if (this.state.showLinkInput === false) {
  //     this.setState({
  //       showFileInput: false,
  //       showLinkInput: true,
  //     });
  //   } else {
  //     this.setState({
  //       showFileInput: true,
  //       showLinkInput: false,
  //     });
  //   }
  // }

  render() {
    return (
      <>
        {this.props.peerConnection ? (
          <>
            <div className="fileShare">
              <p onClick={this.showFileInput}>Share file</p>
              <SendFile
                selectFile={this.props.selectFile}
                sendFile={this.props.sendFile}
                resetFile={this.props.resetFile}
                file={this.props.file}
              />
            </div>
            {this.props.gotFile ? (
              <div className="downloadFile">
                <p>You have received a file</p>
                <button onClick={this.props.download}>Download</button>
              </div>
            ) : null}
            <div className="linkShare">
              <p onClick={this.showFileInput}>Share URL</p>
              <SendLink sendLink={this.props.sendLink} />
            </div>
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
