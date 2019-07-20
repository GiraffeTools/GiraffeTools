import React, {Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Async from 'react-async';

import Banner from '../components/banner';
import CommitBox from '../components/commitBox';
import Container from 'react-bootstrap/Container';
import Footer from '../components/footer';
import RepositoryBox from '../components/repositoryBox';
import {addTokenToQuery} from '../utils/auth';
import styles from '../styles/repository.js';
import {isGitHash} from '../../porcupine/utils';

async function loadRepositories(username, repository) {
  const url = await addTokenToQuery(
      new URL(`https://api.github.com/repos/${username}/${repository}`)
  );
  return (await fetch(url.href)).json();
}

const Repository = (props) => {
  const {username, repository, branchOrCommit} = props.match.params;
  const branchString = branchOrCommit || 'master';
  const isCommit = isGitHash(branchOrCommit);

  const headline = (
    <h4 className="text-center" style={styles.commitTitle}>
      <div>
        Commits for {isCommit ? 'Commit' : 'Branch'}
        <span className="border-bottom" style={styles.branchText}>
          {isCommit ? `${branchString.substring(0, 6)} ` : branchString}
        </span>
      </div>
    </h4>
  );

  return (
    <Fragment>
      <Banner title={repository} />
      <Container style={styles.repository} fluid={true}>
        <Async promiseFn={() => loadRepositories(username, repository)}>
          <Async.Loading>Loading...</Async.Loading>
          <Async.Fulfilled>
            {(repo) => (
              <>
                <RepositoryBox repository={repo} />
                <Col sm={7}>
                  {headline}
                  <CommitBox
                    repository={repo}
                    branchOrCommit={branchOrCommit}
                  />
                </Col>
              </>
            )}
          </Async.Fulfilled>
          <Async.Rejected>
            {(error) => `Something went wrong: ${error.message}`}
          </Async.Rejected>
        </Async>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Repository;
