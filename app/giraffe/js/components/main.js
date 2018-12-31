import React, { Fragment } from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { updateAuth } = this.props;
    fetch("/_github/logged_in/")
      .then(response => response.json())
      .then(user => updateAuth(user))
      .catch(error => {
        console.log({ error });
      });
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default Main;
