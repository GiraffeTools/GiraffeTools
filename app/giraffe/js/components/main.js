import React, { Fragment } from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const { updateAuth } = this.props;
    const response = await fetch("/_github/logged_in/");
    updateAuth(await response.json());
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default Main;
