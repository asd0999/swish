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
              <h3 className="by-line">Share files and links between devices</h3>
              <h3>Easy, fast and secure</h3>
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0, marginTop: 500 }}
          to={{ opacity: 1, marginTop: 42 }}
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
