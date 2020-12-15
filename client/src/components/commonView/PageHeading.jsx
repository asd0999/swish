import React, { Component } from "react";
// import { Spring } from "react-spring/renderprops";

export default class PageHeading extends Component {
  render() {
    return (
      // <Spring
      //   from={{ opacity: 0 }}
      //   to={{ opacity: 1 }}
      //   config={{ duration: 100 }}
      // >
      //   {(props) => (
      //     <div style={props}>
      <div>
        {this.props.peerConnection ? (
          <h2>OTP verified</h2>
        ) : (
          <h2>Device pairing</h2>
        )}
      </div>
      //   </div>
      // )}
      // </Spring>
    );
  }
}
