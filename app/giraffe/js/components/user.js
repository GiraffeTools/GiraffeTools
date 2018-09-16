import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import SlackBanner from "./slackBanner";

const UserBox = () => <div />;
const ProjectBox = () => <div />;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const { user } = this.props;
    fetch(`https://api.github.com/users/${user}`)
      .then(response => response.json())
      .then(user => this.setState({ user }))
      .catch;
  }

  render() {
    const { user } = this.props;

    return (
      <Fragment>
        <Banner title="User" />
        { user ? <div>
          <UserBox />
          <ProjectBox />
        </div> : <div>
          User not found
        </div>
        }
        <SlackBanner />
        <Footer />
      </Fragment>
    );
  }
}

export default User;
