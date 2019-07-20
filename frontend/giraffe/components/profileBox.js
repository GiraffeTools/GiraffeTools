import React from 'react';
import Container from 'react-bootstrap/Container';
import pluralize from 'pluralize';
import {useAsync} from 'react-async';

import SeparatorWithOpenCircle from './separatorWithOpenCircle';
import styles from '../styles/profileBox.js';
import {addTokenToQuery} from '../utils/auth';
import {GITHUB_BASE_API} from '../config';

async function loadUser({username}) {
  const url = await addTokenToQuery(
      new URL(`${GITHUB_BASE_API}/users/${username}`)
  );
  return fetch(url.href).then((response) => response.json());
}

const ProfileBox = ({username, activeProjects}) => {
  const {data, error, isLoading} = useAsync(loadUser, {username});
  const user = isLoading
    ? 'Loading...'
    : error
      ? 'User not found'
      : data.userName;
  const avatarUrl =
    isLoading || error ? '/static/img/giraffetools_logo.png' : data.avatar_url;
  const loggedIn = isLoading || error ? false : data.loggedIn;
  return (
    <div className="col-4 text-center">
      <div className="sticky-top" style={styles.sticky}>
        <div style={styles.box}>
          <img src={avatarUrl} style={styles.profilePic} />
          <h3 style={styles.username}>{user}</h3>
          <SeparatorWithOpenCircle
            color="#4A4A4A"
            thickness={'1px'}
            styleOverwrite={{...styles.componentStyles}}
          />
          <Container style={styles.activeProjectCounter}>
            {activeProjects}
          </Container>
          <div style={styles.activeGiraffeText}>
            active GiraffeTools {pluralize('project', activeProjects)}
          </div>
          <SeparatorWithOpenCircle
            color="#4A4A4A"
            thickness={'1px'}
            styleOverwrite={{...styles.componentStyles}}
          />
          {loggedIn && (
            <button type="button" className="btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileBox;
