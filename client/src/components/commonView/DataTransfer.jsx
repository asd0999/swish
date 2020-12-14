import React, { Component } from "react";
import SendLink from "./SendLink";
import SendFile from "./SendFile";
import { Redirect } from "react-router-dom";

export default class DataTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileInput: false,
      showLinkInput: false,
    };
    this.showLinkInput = this.showLinkInput.bind(this);
    this.showFileInput = this.showFileInput.bind(this);
  }

  showFileInput() {
    if (this.state.showFileInput === false) {
      this.setState({
        showFileInput: true,
      });
    } else {
      this.setState({
        showFileInput: false,
      });
    }
  }

  showLinkInput() {
    if (this.state.showLinkInput === false) {
      this.setState({
        showLinkInput: true,
      });
    } else {
      this.setState({
        showLinkInput: false,
      });
    }
  }

  render() {
    return (
      <>
        {this.props.peerConnection ? (
          <>
            {/* <h2>Connnected to other device</h2> */}
            <span onClick={this.showFileInput}>Share file</span>
            {this.state.showFileInput ? (
              <SendFile
                selectFile={this.props.selectFile}
                sendFile={this.props.sendFile}
                resetFile={this.props.resetFile}
              />
            ) : null}
            {this.props.gotFile ? (
              <>
                <span>You have received a file</span>
                <button onClick={this.props.download}>Download</button>
              </>
            ) : null}
            <span onClick={this.showLinkInput}>Share link</span>
            {this.state.showLinkInput ? (
              <SendLink sendLink={this.props.sendLink} />
            ) : null}
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
