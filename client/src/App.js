import React, { Component } from "react";
import Peer from "peerjs";
import { io } from "socket.io-client";
// const ws = new WebSocket("ws://localhost:4000");

const peer = new Peer({
  host: "tg1799.itp.io",
  port: 9000,
  path: "/",
  secure: true,
  // debug: 3,
});

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      my_id: "",
      socketConnection: false,
      peerConnection: false,
    };
    this.checkApi = this.checkApi.bind(this);
  }

  componentDidMount() {
    socket.on("connect", () => {
      console.log("connected to server");
    });
    // ws.onopen = function () {
    //   console.log("WebSocket Client Connected");
    //   // console.log(this);
    //   ws.send(
    //     JSON.stringify({
    //       message: "hey",
    //     })
    //   );
    // };

    // ws.onmessage = (e) => {
    //   const message = JSON.parse(e);
    //   console.log(message);
    // };

    this.checkApi();

    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      // this.setState({
      //   my_id: id,
      // });
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
        // console.log(data);
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
        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor="message">
            <input type="text" name="message" id="message" />
          </label>
          <input type="submit" value="send" />
        </form> */}
      </div>
    );
  }
}
