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
          config={{ delay: 1200, duration: 1000 }}
        >
          {(props) => (
            <div style={props}>
              <h3>
                share links and files between devices
                <br />
                quick . easy . secure
              </h3>
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 2200 }}
        >
          {(props) => (
            <div style={props}>
              <Choice />
            </div>
          )}
        </Spring>
      </div>
    );
  }
}
