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
            <span>Peer connnection established</span>
            <p></p>
            <SendFile
              selectFile={this.props.selectFile}
              sendFile={this.props.sendFile}
            />
            <p></p>
            {this.props.gotFile ? (
              <>
                <span>You have received a file</span>
                <button onClick={this.props.download}>Download</button>
              </>
            ) : null}
            <p></p>
            <span>Send an instant message</span>
            <Message sendMessage={this.props.sendMessage} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}