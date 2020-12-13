import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  render() {
    return (
      <div>
        <Link to="/initiate-pairing">
          <button>INITIATE PAIRING</button>
        </Link>
        <Link to="/complete-pairing">
          <button>COMPLETE PAIRING</button>
        </Link>
      </div>
    );
  }
}
