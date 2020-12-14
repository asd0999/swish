import React, { Component } from "react";
import Message from "../firstView/Message";
import SendFile from "../firstView/SendFile";
import { Redirect } from "react-router-dom";

export default class FileTransfer extends Component {
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
            <span>Share a link</span>
            <Message sendMessage={this.props.sendMessage} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
