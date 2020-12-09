import React, { Component } from "react";
import Peer from "peerjs";
import { io } from "socket.io-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Choice from "./components/firstView/Choice";
import ShowOTP from "./components/senderView/ShowOTP";
import EnterOTP from "./components/receiverView/EnterOTP";

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
      otp: null,
    };
    this.checkApi = this.checkApi.bind(this);
    this.peerHandler = this.peerHandler.bind(this);
    this.requestOTP = this.requestOTP.bind(this);
    this.pairPeers = this.pairPeers.bind(this);
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

      socket.on("otp", (otp) => {
        this.setState({
          otp: otp,
        });
      });

      socket.on("senderPeerId", (senderPeerId) => {
        console.log("Pairing complete, found sender peer id:", senderPeerId);
      });
      socket.on("receiverPeerId", (receiverPeerId) => {
        console.log(
          "Pairing complete, found receiver peer id:",
          receiverPeerId
        );
      });
    });

    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      // console.log(this);
      self.peerHandler(id);
      socket.emit("peerid", id);
    });

    // const conn = peer.connect("02ce0dd9-183d-4f4d-bdf6-7ce5e14a065d");

    peer.on("connection", function (conn) {
      console.log("peer connected", conn);
    });

    // this.checkApi();
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

  requestOTP() {
    console.log("requesting otp");
    socket.emit("OTPrequest");
  }

  pairPeers(otp) {
    console.log("attempting to pair peers");
    socket.emit("pairingRequest", otp);
  }

  render() {
    return (
      <div>
        <h1>Swish</h1>
        <h3>Peer to peer file transfer</h3>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Choice />
            </Route>
            <Route
              path="/send"
              render={(props) => (
                <ShowOTP
                  {...props}
                  requestOTP={this.requestOTP}
                  otp={this.state.otp}
                />
              )}
            />
            <Route
              path="/receive"
              render={(props) => (
                <EnterOTP {...props} pairPeers={this.pairPeers} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
