import React, { Component } from "react";
import socketIOClient from "socket.io-client";

let socket;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4000/",
    };
    socket = socketIOClient(this.state.endpoint);
  }

  componentDidMount() {
    socket.on("connect", function () {
      console.log("Connected");
    });

    socket.emit("data", "hello");
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
