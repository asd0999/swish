import React, { Component } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Choice from "./components/firstView/Choice";
import ShowOTP from "./components/senderView/ShowOTP";
import EnterOTP from "./components/receiverView/EnterOTP";

let conn = null;

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
  }

  callPeer() {
    console.log("callPeer function called");
    const peer = new Peer({
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

    console.log(peer);

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: "id",
        signalData: data,
        from: this.state.my_sid,
      });
    });

    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
    });
  }

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

        this.callPeer();

        // //sender peer data connection
        // conn = peer.connect(receiverPeerId);
        // // conn.on("open", function () {
        // console.log("peer connected", conn);
        // conn.on("data", function (data) {
        //   // console.log(conn);
        //   console.log(data);
        // });
        // // });

        // sender receives ack for peer connection
        // socket.on("peerConnected", () => {
        //   console.log("peer connected");
        // });
      });
    });

    // // sender + receiver --> conect to peerJS server and obtain peer IDs
    // peer.on("open", function (id) {
    //   console.log("My peer ID is: " + id);
    //   self.peerHandler(id);
    //   socket.emit("peerid", id);
    // });

    // // receiver peer data connection
    // peer.on("connection", function (dataConnection) {
    //   conn = dataConnection;
    //   // conn.on("open", function () {
    //   console.log("peer connected", conn);
    //   conn.on("data", function (data) {
    //     // console.log(conn);
    //     console.log(data);
    //   });
    //   // });

    // console.log("peer connected", conn);
    // socket.emit("peerConnected"); // receiver sends event to server

    // conn.on("data", function (data) {
    //   console.log(data);
    // });
    // });

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

  // peerHandler(id) {
  //   this.setState({
  //     my_peerid: id,
  //     peerConnection: true,
  //   });
  // }

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
