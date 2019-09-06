import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import to from 'await-to-js';

import SeparatorWithOpenCircle from './separatorWithOpenCircle';
import {getCsrfToken} from '../utils/auth';
import {validateEmail} from '../utils/utils';
import styles from '../styles/slackInvite.js';
import {API_HOST} from '../config';


async function handleSubmit(email, setSubmitted, setSucces, setEmailValid) {
  setEmailValid(validateEmail(email));
  setSubmitted(true);
  const body = JSON.stringify({email});

  const inviteResponse = await fetch(`${API_HOST}/send_slack_invite`, {
    method: 'POST',
    headers: {'X-CSRFToken': await getCsrfToken()},
    body,
    credentials: 'include',
  });
  const [error, answer] = await to(inviteResponse.json());

  setSucces(error ? false : answer.ok);
}

const SlackInvite = () => {
  const [inviteSubmitted, setSubmitted] = useState(false);
  const [inviteSucces, setSucces] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  return (
    <Container style={styles.slackInfo}>
      <p style={styles.join}>
        {'Would you like to join the GiraffeTools Slack? Fill in your' +
        ' email address here, and you will receive an invitation link' +
        ' in your inbox!'}
      </p>
      <SeparatorWithOpenCircle
        color="secondary"
        thickness={'1px'}
        styleOverwrite={styles.componentStyles}
      />
      <div>
        <label>
          <h3>Email:</h3>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          onClick={() => handleSubmit(
              email,
              setSubmitted,
              setSucces,
              setEmailValid
          )}
        />
        <div className="">
          <div
            className={
              'alert alert-success alert-dismissible fade' +
              (inviteSubmitted && inviteSucces ? ' show' : '')
            }
            role="alert"
          >
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            Thanks for signing up! Check your email for the Slack invite!
          </div>
          <div
            className={
              'alert alert-danger alert-dismissible fade' +
              (!emailValid ? ' show' : '')
            }
            role="alert"
          >
            Please enter a valid email address
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className={
              'alert alert-danger alert-dismissible fade' +
              (inviteSubmitted && !inviteSucces ? ' show' : '')
            }
            role="alert"
          >
            Hmm, something went wrong... Maybe you already signed up?
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default SlackInvite;
