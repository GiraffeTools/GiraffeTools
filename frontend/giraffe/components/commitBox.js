import React, { Fragment } from "react";
import Radium from "radium";

import Commit from "./commit";
import { groupByDate } from "../utils/utils";
import styles from "../styles/commitBox.js";
import { addTokenToQuery } from "../utils/auth";

class CommitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: null
    };
  }

  async componentDidMount() {
    const { full_name } = this.props.repository;
    const url = await addTokenToQuery(
      new URL(`https://api.github.com/repos/${full_name}/commits`)
    );
    const commits = await fetch(url.href);
    this.setState({ commits: await commits.json() });
  }

  render() {
    const { commits } = this.state;
    const { full_name } = this.props.repository;
    const branch = "master";
    const groupedCommits = commits && commits.length && groupByDate(commits);
    const dates =
      groupedCommits &&
      Object.keys(groupedCommits).sort(function(a, b) {
        a = new Date(a);
        b = new Date(b);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    return groupedCommits ? (
      <div>
        {dates.map(date => {
          const days_ago = (Date.now() - new Date(date)) / 1000 / 3600 / 24;

          return (
            <div key={`${date}`}>
              <h6>
                {days_ago < 1
                  ? "Today"
                  : days_ago < 2
                    ? "Yesterday"
                    : `${date}`}
              </h6>
              <ul style={[styles.commitDay]}>
                {groupedCommits[date].map(({ commit }) => (
                  <Commit
                    key={commit.sha}
                    commit={commit}
                    full_name={full_name}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    ) : (
      <div>Cannot find any commits...</div>
    );
  }
}

export default Radium(CommitBox);
