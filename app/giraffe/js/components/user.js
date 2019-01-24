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
    const githubApiBase = "https://api.github.com";
    const { username } = this.props.match.params;
    const { access_token } = this.props;

    const setUser = async () => {
      const url = await addTokenToQuery(
        new URL(`${githubApiBase}/users/${username}`)
      );
      const user = await fetch(url.href);
      this.setState({ user: await user.json() });
    };
    const giraffeConfigFile = "GIRAFFE.yml";
    const setRepos = async () => {
      const url = await addTokenToQuery(
        new URL(`${githubApiBase}/users/${username}/repos`)
      );
      const repos = await fetch(url.href);
      const repoList = await repos.json();
      if (!repoList.length) return;

      return repoList.map(async repo => {
        const url = await addTokenToQuery(
          new URL(
            `${githubApiBase}/repos/${
              repo.full_name
            }/contents/${giraffeConfigFile}`
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
