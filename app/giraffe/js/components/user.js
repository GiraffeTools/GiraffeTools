import React, { Fragment } from "react";
import Radium from "radium";
import Modals from "../../../porcupine/js/containers/modals";

import { addTokenToQuery } from "../utils/auth";
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

  async componentDidMount() {
    const { username } = this.props.match.params;
    const { access_token } = this.props;

    const setUser = async () => {
      const url = addTokenToQuery(
        new URL(`https://api.github.com/users/${username}`)
      );
      const user = await fetch(url.href);
      this.setState({ user: await user.json() });
    };
    const setRepos = async () => {
      const url = addTokenToQuery(
        new URL(`https://api.github.com/users/${username}/repos`)
      );
      const repos = await fetch(url.href);
      const repoList = await repos.json();
      if (!repoList.length) return;

      return repoList.map(async repo => {
        const url = addTokenToQuery(
          new URL(
            `https://raw.githubusercontent.com/${
              repo.full_name
            }/master/GIRAFFE.yml`
          )
        );
        const file = await fetch(url);
        this.setState({
          repositories: [
            ...this.state.repositories,
            { ...repo, isGiraffeProject: file.ok }
          ]
        });
      });
    };

    Promise.all([setUser(), setRepos()]);
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
