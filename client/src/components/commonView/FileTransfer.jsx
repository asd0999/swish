import React, { Component } from "react";
import Link from "./LinkTransfer";
import SendFile from "./SendFile";
import { Redirect } from "react-router-dom";

export default class FileTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendFile: false,
      sendLink: false,
    };
    this.showLinkInput = this.showLinkInput.bind(this);
  }

  showLinkInput() {}

  render() {
    return (
      <>
        {this.props.peerConnection ? (
          <>
            <h2>Connnected to other device</h2>
            <SendFile
              selectFile={this.props.selectFile}
              sendFile={this.props.sendFile}
            />
            {this.props.gotFile ? (
              <>
                <span>You have received a file</span>
                <button onClick={this.props.download}>Download</button>
              </>
            ) : null}
            <span onClick={this.showLinkInput}>Share a link</span>
            <Link sendLink={this.props.sendLink} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
