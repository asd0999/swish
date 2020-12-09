import React, { Component } from "react";
import Peer from "peerjs";
import { io } from "socket.io-client";

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
      my_peerid: null,
      socket_id: null,
      socketConnection: false,
      peerConnection: false,
    };
    this.checkApi = this.checkApi.bind(this);
    this.peerHandler = this.peerHandler.bind(this);
  }

  componentDidMount() {
    const self = this;
    socket.on("connect", () => {
      console.log("connected to server");
      this.setState({
        socketConnection: true,
      });

      socket.emit("clienthello");

      socket.on("serverack", (data) => {
        console.log("server ack received", data);
        this.setState({
          socket_id: data,
        });
      });
    });

    this.checkApi();

    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      console.log(this);
      self.peerHandler(id);
      socket.emit("peerid", id);
    });
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

  peerHandler(id) {
    this.setState({
      my_peerid: id,
      peerConnection: true,
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
