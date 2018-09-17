import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import SlackBanner from "./slackBanner";

const ProjectBox = repository => (
  <div className="giraffe-box">
    {repository.name}
    <br />
    {repository.private ? "Private" : "Public"}
    <br />
    <img src="/static/img/separator_red.svg" width="20%" />
    <br />
    {repository.created_at}
  </div>
);

const Projects = ({ repositories }) => (
  <div className="col-7 text-center">
    <div>
      <h3 id="your-project-tag">Your projects</h3>
    </div>
    {repositories ? (
      repositories.map(repository => (
        <ProjectBox {...repository} key={repository.id} />
      ))
    ) : (
      <div>This user does not have any projects</div>
    )}
  </div>
);

const ProfileBox = ({ user }) => (
  <div className="col-3 text-center giraffe-box">
    <h3>{user.name}</h3>
    <img src={user.avatar_url} id="profile-pic" />
    <br />
    <img src="/static/img/separator_grey.svg" width="80%" />
    <br />
    {user.active_giraffe_projects}
    active giraffe projects
    <br />
    <img src="/static/img/separator_grey.svg" width="80%" />
    {user.loggedIn && <button>Logout</button>}
  </div>
);

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repositories: null
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
      .then(repositories => this.setState({ repositories }))
      .catch();
  }

  render() {
    const { user, repositories } = this.state;
    const banner = user ? `Giraffe & ${user.login}` : "GiraffeTools";

    return (
      <Fragment>
        <Banner title={banner} />
        {user ? (
          <div className="row">
            <div className="col-1" />
            <ProfileBox user={user} />
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
