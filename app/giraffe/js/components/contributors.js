import React from "react";
import Radium from "radium";

import { addTokenToQuery } from "../utils/auth";
import { shuffle } from "../utils/utils";
import Contributor from "./contributor";
import styles from "../styles/contributors.js";

class Contributors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: null,
      selectedContributors: null
    };
    this.selectContributors = this.selectContributors.bind(this);
  }

  async componentDidMount() {
    const url = addTokenToQuery(
      new URL(
        "https://api.github.com/repos/TimVanMourik/GiraffeTools/contributors"
      )
    );
    const contributors = await fetch(url.href);
    const json = await contributors.json();
    this.setState({
      contributors: json,
      selectContributors: shuffle(
        Array.apply(null, { length: json.length }).map(Number.call, Number)
      ).slice(0, 9)
    });
  }

  selectContributors(direction) {
    const { contributors, selectContributors } = this.state;
    // #TODO implement pagination
    switch (direction) {
      case "next":
        break;
      case "previous":
        break;
    }
    // Just reshuffle them randomly for now
    this.setState({
      selectContributors: shuffle(
        Array.apply(null, { length: contributors.length }).map(
          Number.call,
          Number
        )
      ).slice(0, 9)
    });
  }

  render() {
    const { contributors, selectContributors } = this.state;

    return (
      <div className="d-flex" style={[styles.contributors]}>
        <div className="col-6 border-right">
          <h3>&amp; all the brave contributors</h3>
          {contributors && (
            <div className="d-flex">
              <img
                src="/static/img/arrow_left.svg"
                style={[styles.contributorArrow]}
                onClick={() => this.selectContributors("previous")}
              />
              <div style={[styles.contributorList]}>
                {contributors &&
                  contributors
                    .filter((item, index) => selectContributors.includes(index))
                    .map(contributor => (
                      <Contributor key={contributor.id} {...contributor} />
                    ))}
              </div>
              <img
                style={[styles.contributorArrow]}
                src="/static/img/arrow_right.svg"
                onClick={() => this.selectContributors("next")}
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
