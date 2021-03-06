import React from "react";
import { BallBeat } from "react-pure-loaders";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <div>
        <BallBeat color={"#123abc"} loading={this.state.loading} />
      </div>
    );
  }
}

export default Loader;
