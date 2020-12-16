import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default class Header extends Component {
  render() {
    return (
      <div className="heading">
        <Spring
          from={{ opacity: 0, marginLeft: -500 }}
          to={{ opacity: 1, marginLeft: 20 }}
          config={{ duration: 800 }}
        >
          {(props) => (
            <div style={props}>
              <h1>SW</h1>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}
