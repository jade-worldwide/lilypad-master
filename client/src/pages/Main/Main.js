import React, { Component } from "react";
import { MainHero, LocationSearchInput } from "../../components/MainHero";

class Main extends Component {
  // Setting our component's initial state
  state = {
  };




  render() {
    return (
      <div className="Main">
        <MainHero>
          <LocationSearchInput />
        </MainHero>
      </div>
    );
  }
}

export default Main;
