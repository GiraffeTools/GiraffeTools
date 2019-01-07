import React, { Fragment } from "react";
import Radium from "radium";
import Modals from "../../../porcupine/js/containers/modals";

import { urlExists } from "../utils/utils";
import styles from "../styles/user.js";

import Banner from "./banner";
import Footer from "./footer";
import ProfileBox from "./profileBox";
import Projects from "./projects";
import SlackBanner from "./slackBanner";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repositories: []
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;

    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(user => this.setState({ user }))
      .catch();
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repositories => {
        repositories.forEach(repository => {
          // I want no error message when polling existence, which can't be turned off in regular fetch call
          urlExists(
            `https://raw.githubusercontent.com/${
              repository.full_name
            }/master/GIRAFFE.yml`,
            exists => {
              this.setState({
                repositories: [
                  ...this.state.repositories,
                  { ...repository, isGiraffeProject: exists }
                ]
              });
            }
          );
        });
      })
      .catch();
  }

  render() {
    const { user, repositories } = this.state;
    const bannerTitle = user ? `Giraffe & ${user.login}` : "GiraffeTools";

    return (
      <Fragment>
        <Modals />
        <Banner title={bannerTitle} />
        {user ? (
          <div
            className="d-flex justify-content-center"
            style={[styles.userSection]}
          >
            <ProfileBox
              user={user}
              active_giraffe_projects={
                repositories.filter(e => e.isGiraffeProject).length
              }
            />
            <Projects repositories={repositories} />
          </div>
        ) : (
          <div>User not found</div>
        )}
        <SlackBanner />
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(User);
