import React, { Fragment } from "react";
import Radium from "radium";
import Async from "react-async";

import Commit from "./commit";
import { groupByDate } from "../utils/utils";
import styles from "../styles/commitBox.js";
import { addTokenToQuery } from "../utils/auth";

async function loadCommits(props) {
  const { full_name } = props;
  const url = await addTokenToQuery(
    new URL(`https://api.github.com/repos/${full_name}/commits`)
  );
  return fetch(url.href).then(res => res.json());
}

const sortDateFunction = (a, b) => {
  a = new Date(a);
  b = new Date(b);
  return a > b ? -1 : a < b ? 1 : 0;
};

const CommitSection = ({ date, commits, full_name }) => {
  const days_ago = (Date.now() - new Date(date)) / 1000 / 3600 / 24;
  return (
    <div>
      <h6>{days_ago < 1 ? "Today" : days_ago < 2 ? "Yesterday" : `${date}`}</h6>
      <ul style={styles.commitDay}>
        {commits.map(({ commit }) => (
          <Commit key={commit.sha} commit={commit} full_name={full_name} />
        ))}
      </ul>
    </div>
  );
};

const CommitBox = props => {
  const { full_name } = props.repository;
  return (
    <Async promiseFn={loadCommits} full_name={full_name}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Fulfilled>
        {commits => {
          const groupedCommits = commits.length && groupByDate(commits);
          const dates =
            groupedCommits &&
            Object.keys(groupedCommits).sort(sortDateFunction);

          return (
            <div>
              {dates.map((date, index) => (
                <CommitSection
                  key={index}
                  date={date}
                  commits={groupedCommits[date]}
                  full_name={full_name}
                />
              ))}
            </div>
          );
        }}
      </Async.Fulfilled>
      <Async.Rejected>
        {error => <div>Cannot find any commits...</div>}
      </Async.Rejected>
    </Async>
  );
};

export default Radium(CommitBox);
