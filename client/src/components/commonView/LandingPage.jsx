import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import Choice from "./Choice";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="sub-heading">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 600, duration: 1000 }}
        >
          {(props) => (
            <div style={props}>
              <h2>Share files and URLs between devices</h2>
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0, marginTop: 500 }}
          to={{ opacity: 1, marginTop: 100 }}
          config={{ delay: 1000, duration: 300 }}
        >
          {(props) => (
            <div className="choiceBtns" style={props}>
              <Choice
                peerConnection={this.props.peerConnection}
                refreshPage={this.props.refreshPage}
              />
            </div>
          )}
        </Spring>
      </div>
    );
  }
}
