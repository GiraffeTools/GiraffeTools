import React, { Fragment } from "react";
import { urlExists } from "../utils/utils";

import Banner from "./banner";
import Footer from "./footer";
import SlackBanner from "./slackBanner";

const ProjectBox = repository => (
  <div
    className={
      "giraffe-box row " + (repository.isGiraffeProject ? "" : "no-giraffe")
    }
  >
    <div className="col-6 text-left">
      <h4>{repository.name}</h4>
      {repository.private ? "Private" : "Public"}
      <br />
      <img src="/static/img/separator_red.svg" width="20%" />
      <br />
      added{" "}
      {new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      }).format(new Date(repository.created_at))}
    </div>
    <div className="col-6 text-right">
      {repository.isGiraffeProject ? (
        <a
          type="button btn-primary"
          className="btn giraffe-button"
          href={`/github/${repository.full_name}`}
        >
          Open
        </a>
      ) : (
        <a type="button btn-primary" className="btn no-giraffe-button">
          Add
        </a>
      )}
    </div>
  </div>
);

const Projects = ({ repositories }) => (
  <div className="col-7 text-center">
    <div>
      <h3 id="your-project-tag">Your projects</h3>
    </div>
    {repositories ? (
      repositories
        .sort(function(a, b) {
          return b.isGiraffeProject - a.isGiraffeProject;
        })
        .map(repository => <ProjectBox key={repository.id} {...repository} />)
    ) : (
      <div>This user does not have any GitHub projects.</div>
    )}
  </div>
);

const ProfileBox = ({ user, active_giraffe_projects }) => (
  <div className="col-3 text-center giraffe-box">
    <img src={user.avatar_url} id="profile-pic" />
    <br />
    <img src="/static/img/separator_grey.svg" width="80%" />
    <br />
    <h3 id="username">{user.name}</h3>
    <div className="text-center" id="active-project-counter">
      {active_giraffe_projects}
    </div>
    active GiraffeTools {pluralize("project", active_giraffe_projects)}
    <br />
    <img src="/static/img/separator_grey.svg" width="80%" />
    {user.loggedIn && (
      <button type="button" className="btn">
        Logout
      </button>
    )}
  </div>
);

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
        <Banner title={bannerTitle} />
        {user ? (
          <div className="row">
            <div className="col-1" />
            <ProfileBox
              user={user}
              active_giraffe_projects={
                repositories.filter(e => e.isGiraffeProject).length
              }
            />
            <Projects repositories={repositories} />
            <div className="col-1" />
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

export default User;
