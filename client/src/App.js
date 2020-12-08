import React, { Component } from "react";
// import socketIOClient from "socket.io-client";
const ws = new WebSocket("ws://localhost:4000");

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4000",
    };
  }

  componentDidMount() {
    // const socket = socketIOClient(this.state.endpoint);
    // // console.log(socket);
    // socket.on("connect", function () {
    //   console.log("Connected");
    // });
    ws.onopen = function (e) {
      console.log("WebSocket Client Connected", e);
    };
  }

  render() {
    return (
      <div>
        <h1>Swish</h1>
        <h3>Peer to peer file transfer</h3>
      </div>
    );
  }
}
