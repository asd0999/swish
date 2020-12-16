import React, { Component } from "react";
import SendLink from "./SendLink";
import SendFile from "./SendFile";
import { Redirect } from "react-router-dom";
import Inbox from "./Inbox";

export default class DataTransfer extends Component {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   showFileInput: false,
  //   showLinkInput: false,
  // };
  // this.showLinkInput = this.showLinkInput.bind(this);
  // this.showFileInput = this.showFileInput.bind(this);
  // }

  // showFileInput() {
  //   console.log("showFileInput");
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
  //   console.log("showLinkInput");
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
              {/* <p onClick={this.showFileInput}>Share file</p> */}
              <SendFile
                // showFileInput={this.showFileInput}
                selectFile={this.props.selectFile}
                sendFile={this.props.sendFile}
                resetFile={this.props.resetFile}
                file={this.props.file}
                fileTransferComplete={this.props.fileTransferComplete}
                peerConnection={this.props.peerConnection}
              />
            </div>
            <div className="linkShare">
              {/* <p onClick={this.showFileInput}>Share URL</p> */}
              <SendLink
                sendLink={this.props.sendLink}
                // showLinkInput={this.showLinkInput}
              />
            </div>
            <div className="itemsReceived">
              <Inbox
                download={this.props.download}
                gotFile={this.props.gotFile}
                linkReceived={this.props.linkReceived}
              />
            </div>
            {/* {this.props.gotFile ? (
              <div className="downloadFile">
                <p>You have received a file</p>
                <button onClick={this.props.download}>Download</button>
              </div>
            ) : null} */}
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
