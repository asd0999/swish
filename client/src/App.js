import React, { Component } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Choice from "./components/firstView/Choice";
import ShowOTP from "./components/senderView/ShowOTP";
import EnterOTP from "./components/receiverView/EnterOTP";

let conn = null;
let peer = null;

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // my_peerid: null,
      my_sid: null,
      peer_sid: null,
      socketConnection: false,
      peerConnection: false,
      otp: null,
    };
    this.checkApi = this.checkApi.bind(this);
    // this.peerHandler = this.peerHandler.bind(this);
    this.requestOTP = this.requestOTP.bind(this);
    this.pairPeers = this.pairPeers.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.callPeer = this.callPeer.bind(this);
    this.acceptCall = this.acceptCall.bind(this);
  }

  callPeer(id) {
    peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
    });

    // sender peer instance
    console.log("Creating Peer instance", peer);

    peer.on("signal", (data) => {
      socket.emit("callPeer", {
        peerToCall: id,
        signalData: data,
        from: this.state.my_sid,
      });
    });

    socket.on("callAccepted", (signal) => {
      console.log(
        "Call accpeted by receiver, sending peer signal to create connection"
      );
      peer.signal(signal);
    });
  }

  acceptCall() {}

  componentDidMount() {
    // const self = this;
    socket.on("connect", () => {
      console.log("connected to server");
      this.setState({
        socketConnection: true,
      });

      socket.emit("clienthello");

      socket.on("serverack", (data) => {
        console.log("server ack received", data);
        this.setState({
          my_sid: data,
        });
      });

      socket.on("otp", (otp) => {
        this.setState({
          otp: otp,
        });
        console.log("otp received, waiting for receiver to pair");
      });

      socket.on("senderSocketId", (senderSocketId) => {
        console.log(
          "Pairing complete, found sender Socket id:",
          senderSocketId
        );
        this.setState({
          peer_sid: senderSocketId,
        });
      });

      socket.on("receiverSocketId", (receiverSocketId) => {
        console.log(
          "Pairing complete, found receiver Socket id:",
          receiverSocketId
        );
        this.setState({
          peer_sid: receiverSocketId,
        });

        this.callPeer(this.state.peer_sid);
      });

      socket.on("calling", (callerSignal) => {
        console.log("Call received");
        peer = new Peer({
          initiator: false,
          trickle: false,
        });

        // receiver peer instance
        console.log("Creating Peer instance", peer);

        // this.acceptCall(peer);

        peer.on("signal", (data) => {
          //breaking here
          socket.emit("acceptCall", { signal: data, to: this.state.peer_sid });
          console.log("Call accepted");
        });

        peer.signal(callerSignal.signal);
      });
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

  requestOTP() {
    console.log("requesting otp");
    socket.emit("OTPrequest");
  }

  pairPeers(otp) {
    console.log("attempting to pair peers");
    socket.emit("pairingRequest", otp);
    this.setState({
      otp: otp,
    });
  }

  sendMessage(data) {
    conn.send(data);
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
                  sendMessage={this.sendMessage}
                />
              )}
            />
            <Route
              path="/receive"
              render={(props) => (
                <EnterOTP
                  {...props}
                  pairPeers={this.pairPeers}
                  sendMessage={this.sendMessage}
                  // callPeer={this.callPeer}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
