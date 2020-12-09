import React, { Component } from "react";
// import socketIOClient from "socket.io-client";
const ws = new WebSocket("ws://localhost:8080");

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.checkApi = this.checkApi.bind(this);
  }

  componentDidMount() {
    // const socket = socketIOClient(this.state.endpoint);
    // // console.log(socket);
    // socket.on("connect", function () {
    //   console.log("Connected");
    // });
    ws.onopen = function () {
      console.log("WebSocket Client Connected");
    };
    this.checkApi();
  }

  checkApi() {
    fetch("http://localhost:4000/api")
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        console.log(json);
      });
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
