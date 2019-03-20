import React, { Fragment } from "react";
import Radium from "radium";
import update from "immutability-helper";

import Modals from "../../../porcupine/js/containers/modals";
import { addTokenToQuery } from "../utils/auth";
import { urlExists } from "../utils/utils";
import styles from "../styles/user.js";

import Banner from "../components/banner";
import Footer from "../components/footer";
import ProfileBox from "../components/profileBox";
import Projects from "../components/projects";
import SlackBanner from "../components/slackBanner";

const githubApiBase = "https://api.github.com";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repositories: [],
      hasMoreItems: true,
      nextHref: 1
    };
    this.loadMoreRepos = this.loadMoreRepos.bind(this);
  }

  async loadMoreRepos() {
    const { username } = this.props.match.params;
    const { nextHref } = this.state;

    const url = await addTokenToQuery(
      new URL(`${githubApiBase}/users/${username}/repos?page=${nextHref}`)
    );
    const repos = await fetch(url.href);
    const repoList = await repos.json();
    if (!repoList.length) {
      this.setState({
        hasMoreItems: false
      });
      return;
    }
    this.setState(prevState => ({
      repositories: prevState.repositories.concat(repoList),
      nextHref: this.state.nextHref + 1
    }));

    const giraffeConfigFile = "GIRAFFE.yml";
    const setGiraffeProject = async (repo, index) => {
      const url = await addTokenToQuery(
        new URL(
          `${githubApiBase}/repos/${
            repo.full_name
          }/contents/${giraffeConfigFile}`
        )
      );
      const file = await fetch(url);
      this.setState({
        repositories: update(this.state.repositories, {
          [index]: { isGiraffeProject: { $set: file.ok } }
        })
      });
    };
    Promise.all(repoList.map((repo, index) => setGiraffeProject(repo, index)));
  }

  async componentDidMount() {
    const { username } = this.props.match.params;
    const { access_token } = this.props;

    const setUser = async () => {
      const url = await addTokenToQuery(
        new URL(`${githubApiBase}/users/${username}`)
      );
      const user = await fetch(url.href);
      this.setState({ user: await user.json() });
    };
    Promise.all([setUser()]);
  }

  render() {
    const { user, hasMoreItems, repositories } = this.state;
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
            <Projects
              repositories={repositories}
              hasMore={hasMoreItems}
              loadMore={this.loadMoreRepos}
            />
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
