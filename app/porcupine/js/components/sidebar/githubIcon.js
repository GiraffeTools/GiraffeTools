import React from "react";
import Radium from "radium";

import styles from "../../styles/githubIcon";
import { addTokenToQuery } from "../../../../giraffe/js/utils/auth";

class GithubIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: null,
      forks: null
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const { user, repo, type } = this.props;
    const url = await addTokenToQuery(
      new URL(`https://api.github.com/repos/${user}/${repo}`)
    );
    const github = await fetch(url.href);
    const repository = await github.json();
    this.setState({
      stars: repository.stargazers_count,
      forks: repository.forks_count
    });
  }

  render() {
    const { user, repo, type } = this.props;
    const { stars, forks } = this.state;
    let count = null;
    let link = null;
    let capitalised = null;
    switch (type) {
      case "star":
        count = stars;
        link = "stargazers";
        capitalised = "Star";
        break;
      case "fork":
        count = forks;
        link = "network";
        capitalised = "Fork";
        break;
    }

    return (
      <div className="large" style={[styles.button]}>
        <a
          href={`https://github.com/${user}/${repo}/${
            type == "fork" ? "fork" : ""
          }`}
          target="_blank"
          // className="btn"
          aria-label={`${type} ${user}/${repo} on GitHub`}
          style={[styles.githubButton]}
        >
          <img
            // className="octicon octicon-star"
            src={`/static/img/gh-${type}-icon.svg`}
            style={[styles.octicon]}
          />
          <span>{capitalised}</span>
        </a>
        <a
          href={`https://github.com/${user}/${repo}/${link}`}
          target="_blank"
          className="social-count"
          aria-label={(forks || "--") + " forks on GitHub"}
          style={[styles.socialCount]}
        >
          <b style={[styles.b]} />
          <i style={[styles.i]} />
          <span>{count == null ? "--" : count}</span>
        </a>
      </div>
    );
  }
}

export default Radium(GithubIcon);
