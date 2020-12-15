import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

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
      </div>
    );
  }
}
