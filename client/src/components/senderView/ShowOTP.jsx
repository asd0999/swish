import React, { Component } from "react";
import Message from "../firstView/Message";

export default class ShowOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      // gotFile: false,
    };
    // this.fileInput = React.createRef();
    // this.selectFile = this.selectFile.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  readFile(event) {
    console.log(event);
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      console.log(this);
      let arrayBuffer = this.result;
      let array = new Uint8Array(arrayBuffer);
      let binaryString = String.fromCharCode.apply(null, array);

      console.log(binaryString);
    };
    reader.readAsArrayBuffer(file);
  }

  componentDidMount() {
    this.props.requestOTP();
  }

  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <span>Peer connnection established</span>
            <Message sendMessage={this.props.sendMessage} />
            <div id="select-file-dialog">
              <div id="dialog-content">
                <div id="select-file">
                  <div id="label">Select a file:</div>
                  <input
                    type="file"
                    id="select-file-input"
                    // ref={this.fileInput}
                    onChange={this.readFile}
                  />
                </div>
                <div id="dialog-footer">
                  <button id="ok-button">Ok</button>
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
