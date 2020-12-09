import React, { Component } from "react";
import Peer from "peerjs";
const ws = new WebSocket("ws://localhost:4000");

const peer = new Peer({
  host: "tg1799.itp.io",
  port: 9000,
  path: "/",
  secure: true,
  debug: 3,
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.checkApi = this.checkApi.bind(this);
  }

  componentDidMount() {
    ws.onopen = function () {
      console.log("WebSocket Client Connected");
    };
    this.checkApi();

    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
    });

    // peer.on("error", function (err) {
    //   console.log(err);
    // });

    // peer.on("call", function (incoming_call) {
    //   incoming_call.answer(peer_stream);
    // });

    // peer.on("close", function () {
    //   console.log("close!!!");
    // });
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
