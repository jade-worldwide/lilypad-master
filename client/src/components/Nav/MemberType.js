import React, { Component } from "react";
// import { ModalCardBody, Button } from 'bloomer';
// import { Link } from "react-router-dom";


export class MemberType extends Component {
  // Setting our component's initial state

  state = {
    renter: "",
    manager: "",
  };

  renterActive = () => {
    this.setState({ renter: "user-active", manager: "" })
  }

  managerActive = () => {
    this.setState({ manager: "user-active", renter: "" })
  }



  render() {
    return (
      <div className="columns member-type-modal">

        <div className="column">
        </div>
        <div className="column">

          <h1 className="title user-title">Who are you?</h1>

          <div className="user-type renter" id={this.state.renter} onClick={this.renterActive}>
            <h1 className="subtitle">I'm a renter</h1>
          </div>

          <div className="user-type manager" id={this.state.manager} onClick={this.managerActive}>
            <h1 className="subtitle">I'm a property manager</h1>
          </div>

        </div>
      </div>

    );
  }
}
