import React from "react";

import { shuffle } from "../utils/utils";

const Contributor = contributor => {
  return (
    <div className="col-4 justify-content-center d-flex">
      <div className="card">
        <img className="avatar-image" src={contributor.avatar_url} />
        <div id="contributor-tag">
          <a href={contributor.html_url} target="_blank">
            {" "}
            <b>@{contributor.login}</b>
          </a>
        </div>
      </div>
    </div>
  );
};

const SelectedContributors = ({ contributors }) => (
  <div className="d-flex">
    <img className="contributor-arrow" src="/static/img/arrow_left.svg" />
    <div className="contributor-list">
      {shuffle(contributors)
        .slice(0, 9)
        .map(contributor => (
          <Contributor key={contributor.id} {...contributor} />
        ))}
    </div>
    <img className="contributor-arrow" src="/static/img/arrow_right.svg" />
  </div>
);

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
      <div className="d-flex" id="contributors">
        <div className="col-6 border-right" id="contributor-panel">
          <h3>&amp; all the brave contributors</h3>
          {contributors && <SelectedContributors contributors={contributors} />}
        </div>
        <div className="col-6 justify-content-center d-flex">
          <h3 id="gitcoin-text">
            Most contributors have contributed to this Open Source project with
            Gitcoin. If you want to help grow this platform, you can donate or
            fund projects and issues directly!
          </h3>
          <img id="eth-qr-code" src="/static/img/eth-qr.svg" />
        </div>
      </div>
    );
  }
}

export default Contributors;
