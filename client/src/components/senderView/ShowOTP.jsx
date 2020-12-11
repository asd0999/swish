import React, { Component } from "react";
import Message from "../firstView/Message";

export default class ShowOTP extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     file: null,
  //   };
  // this.selectFile = this.selectFile.bind(this);
  // this.sendFile = this.sendFile.bind(this);
  // }

  // selectFile(event) {
  //   console.log(event);
  //   this.setState({
  //     file: event.target.files[0], //arrayBuffer
  //   });
  // }

  // sendFile() {
  //   const peer = this.props.peer;
  //   const stream = this.state.file.stream();
  //   const reader = stream.getReader();

  //   reader.read().then((obj) => {
  //     handleReading(obj.done, obj.value);
  //   });

  //   function handleReading(done, value) {
  //     if (done) {
  //       peer.write(
  //         JSON.stringify({
  //           done: true,
  //           fileName: this.state.file.name,
  //         })
  //       );
  //     }

  //     peer.write(value);
  //     reader.read().then((obj) => {
  //       handleReading(obj.done, obj.value);
  //     });
  //   }
  // }

  componentDidMount() {
    this.props.requestOTP();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <span>Peer connnection established</span>
            <p></p>
            {/* <Message sendMessage={this.props.sendMessage} /> */}
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
          </>
        ) : (
          <>
            <h1>{this.props.otp}</h1>
            <button onClick={this.props.requestOTP}>Refresh OTP</button>
          </>
        )}
      </div>
    );
  }
}
