import React from "react";
import Radium from "radium";

import { shuffle } from "../utils/utils";
import Contributor from "./contributor";
import styles from "../styles/contributors.js";

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
      <div className="d-flex" style={[styles.contributors]}>
        <div className="col-6 border-right" id="contributor-panel">
          <h3>&amp; all the brave contributors</h3>
          {contributors && (
            <div className="d-flex">
              <img
                className="contributor-arrow"
                src="/static/img/arrow_left.svg"
              />
              <div style={[styles.contributorList]}>
                {shuffle(contributors)
                  .slice(0, 9)
                  .map(contributor => (
                    <Contributor key={contributor.id} {...contributor} />
                  ))}
              </div>
              <img
                className="contributor-arrow"
                src="/static/img/arrow_right.svg"
              />
            </div>
          )}
        </div>
        <div className="col-6 justify-content-center d-flex">
          <h3 style={[styles.gitcoinText]}>
            Most contributors have contributed to this Open Source project with
            Gitcoin. If you want to help grow this platform, you can donate or
            fund projects and issues directly!
          </h3>
          <img src="/static/img/eth-qr.svg" style={[styles.ethQrCode]} />
        </div>
      </div>
    );
  }
}

export default Radium(Contributors);
