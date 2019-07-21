import React from 'react';
import Container from 'react-bootstrap/Container';
import to from 'await-to-js';

import SeparatorWithOpenCircle from './separatorWithOpenCircle';
import {getCsrfToken} from '../utils/auth';
import {validateEmail} from '../utils/utils';
import styles from '../styles/slackInvite.js';
import {API_HOST} from '../config';

class SlackInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitted: false,
      emailValid: true,
      succes: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    const email = this.state.value;
    if (!validateEmail(email)) {
      this.setState({emailValid: false});
      return;
    } else {
      this.setState({emailValid: true});
    }
    this.setState({submitted: true});
    const body = JSON.stringify({email});

    const inviteResponse = await fetch(`${API_HOST}/send_slack_invite`, {
      method: 'POST',
      headers: {'X-CSRFToken': await getCsrfToken()},
      body,
      credentials: 'include',
    });
    const [error, answer] = await to(inviteResponse.json());
    if (error) {
      return false;
    } else {
      return answer.ok;
    }
  }

  render() {
    const {success, emailValid, submitted} = this.state;

    return (
      <Container style={styles.slackInfo}>
        <p style={[styles.join]}>
          {'Would you like to join the GiraffeTools Slack? Fill in your email' +
          'address here, and you will receive an invitation link in your inbox!'}
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
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
          <div className="">
            <div
              className={
                'alert alert-success alert-dismissible fade' +
                (submitted && success ? ' show' : '')
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
                (submitted && !success ? ' show' : '')
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
  }
}

export default SlackInvite;
