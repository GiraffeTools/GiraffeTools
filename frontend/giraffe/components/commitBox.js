import React, {useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Commit from './commit';
import {groupByDate} from '../utils/utils';
import styles from '../styles/commitBox.js';
import {addTokenToQuery} from '../utils/auth';
import {GITHUB_BASE_API} from '../config';

async function loadCommits(
    full_name,
    branchOrCommit,
    page,
    setCommits,
    setHasMore
) {
  const url = await addTokenToQuery(
      new URL(`${GITHUB_BASE_API}/repos/${full_name}/commits`)
  );
  url.searchParams.append('page', page);
  if (branchOrCommit) url.searchParams.append('sha', branchOrCommit);

  const newCommits = await (await fetch(url.href)).json();
  if (!newCommits.length) {
    setHasMore(false);
    return;
  }
  setCommits((commits) => commits.concat(newCommits));
}

const sortDateFunction = (a, b) => {
  a = new Date(a);
  b = new Date(b);
  return a > b ? -1 : a < b ? 1 : 0;
};

const CommitSection = ({date, commits, full_name}) => {
  const daysAgo = (Date.now() - new Date(date)) / 1000 / 3600 / 24;
  return (
    <div>
      <h6>{daysAgo < 1 ? 'Today' : daysAgo < 2 ? 'Yesterday' : `${date}`}</h6>
      <ul style={styles.commitDay}>
        {commits.map(({commit}, index) => (
          <Commit key={index} commit={commit} fullName={full_name} />
        ))}
      </ul>
    </div>
  );
};

const CommitBox = (props) => {
  const {branchOrCommit, repository} = props;
  const {full_name} = repository;

  const [commits, setCommits] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const groupedCommits = commits.length && groupByDate(commits);
  const dates =
    groupedCommits && Object.keys(groupedCommits).sort(sortDateFunction);
  const commitSection = dates ? (
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
  ) : (
    <div>Cannot find any commits...</div>
  );

  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={(page) => {
        loadCommits(full_name, branchOrCommit, page, setCommits, setHasMore);
      }}
      hasMore={hasMore}
      loader={loader}
    >
      {commitSection}
    </InfiniteScroll>
  );
};

export default CommitBox;
