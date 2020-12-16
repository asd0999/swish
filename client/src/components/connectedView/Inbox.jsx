import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Spring } from "react-spring/renderprops";

export default class Inbox extends Component {
  render() {
    return (
      <div className="inbox">
        <p>Inbox</p>
        <div className="linkReceived">
          <a href={this.props.linkReceived} target="_blank">
            {this.props.linkReceived}{" "}
          </a>
        </div>
        {this.props.gotFile ? (
          <div className="downloadFile">
            <Spring
              from={{ opacity: 0, marginTop: -200 }}
              to={{ opacity: 1, marginTop: 0 }}
              config={{ duration: 400 }}
            >
              {(props) => (
                <div style={props}>
                  <button onClick={this.props.download}>Got file!</button>
                </div>
              )}
            </Spring>
          </div>
        ) : (
          <button className="noFile">No File</button>
        )}
      </div>
    );
  }
}
