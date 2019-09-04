import React, {useEffect, useState} from 'react';

import {addTokenToQuery} from '../utils/auth';
import {shuffle} from '../utils/utils';
import Contributor from './contributor';
import styles from '../styles/contributors.js';


async function loadContributors(setContributors) {
  const url = await addTokenToQuery(
      new URL(
          'https://api.github.com/repos/TimVanMourik/GiraffeTools/contributors'
      )
  );
  const contributors = (await (await fetch(url.href)).json())
      .filter((contributor) => !contributor.login.includes('[bot]'));

  setContributors(shuffle(contributors));
}

function mount(setContributors) {
  loadContributors(setContributors);
}

const modulo = (n, m) => ((n % m) + m) % m;

const NUMBER_OF_CONTRIBUTORS_SHOWN = 9;
const Contributors = () => {
  useEffect(() => mount(setContributors), []);

  const [contributors, setContributors] = useState([]);
  const [selection, setSelection] = useState(0);

  const indices = Array.from(
      new Array(NUMBER_OF_CONTRIBUTORS_SHOWN), (x, i) => modulo(i + selection, contributors.length)
  );
  const visibleContributors = contributors && contributors
      .filter((item, index) => indices.includes(index))
      .map((contributor) => (
        <Contributor key={contributor.id} {...contributor} />
      ));

  return (
    <div style={styles.contributors}>
      <div className="col-6 border-right">
        <h3>&amp; all the brave contributors</h3>
        {contributors && (
          <div className="d-flex">
            <img
              src="/static/img/arrow_left.svg"
              style={styles.contributorArrow}
              onClick={() => setSelection(selection + NUMBER_OF_CONTRIBUTORS_SHOWN)}
            />
            <div style={styles.contributorList}>
              {visibleContributors}
            </div>
            <img
              style={styles.contributorArrow}
              src="/static/img/arrow_right.svg"
              onClick={() => setSelection(selection - NUMBER_OF_CONTRIBUTORS_SHOWN)}
            />
          </div>
        )}
      </div>
      <div className="col-6 justify-content-center d-flex row">
        <h3 style={styles.gitcoinText}>
          Most contributors have contributed to this Open Source project with
          Gitcoin. If you want to help grow this platform, you can donate or
          fund projects and issues directly!
        </h3>
        <img src="/static/img/eth-qr.svg" style={styles.ethQrCode} />
      </div>
    </div>
  );
};
export default Contributors;
