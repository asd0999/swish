import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Connecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate(this);
  }

  animate(self) {
    console.log("strat");
    // const btn = document.querySelector(".user-visual");
    const loader = document.querySelector(".loader");
    const check = document.querySelector(".check");

    // btn.addEventListener("click", function () {
    loader.classList.add("active");
    // });

    loader.addEventListener("animationend", function () {
      check.classList.add("active");
      // console.log("ho gaya");
      setTimeout(() => {
        self.setState({
          done: true,
        });
      }, 1000);
    });
  }

  render() {
    return (
      <div>
        {this.state.done ? (
          <Redirect to="/connected" />
        ) : (
          <>
            <div className="loader">
              <div className="check">
                <span className="check-one"></span>
                <span className="check-two"></span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
