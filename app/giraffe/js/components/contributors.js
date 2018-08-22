import React from "react";

import { shuffle } from "../utils/utils";

const Contributor = contributor => {
  return (
    <li>
      <img className="avatar-image" src={contributor.avatar_url} />
      <br />
      <a href={contributor.html_url} target="_blank">
        {" "}
        <b>@{contributor.login}</b>
      </a>
    </li>
  );
};

class Contributors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: null
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/repos/TimVanMourik/GiraffeTools/contributors")
      .then(response => response.json())
      .then(contributors => this.setState({ contributors }));
  }

  render() {
    const { contributors } = this.state;

    return (
      <div className="container right" id="contributors" >
        <h3>All contributors</h3>
        <div className="card mb-12 text-center">
          <ul className="contributor-list">
            {contributors &&
              shuffle(contributors).map(contributor => (
                <Contributor key={contributor.id} {...contributor} />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Contributors;
