import React from "react";
import Radium from "radium";

import { getCookie, validateEmail } from "../utils";
import styles from "../styles/slackInvite.js";

class SlackInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      submitted: false,
      emailValid: true,
      succes: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const token = getCookie("csrftoken");
    const email = this.state.value;
    if (!validateEmail(email)) {
      this.setState({
        emailValid: false
      });
      return;
    } else {
      this.setState({
        emailValid: true
      });
    }
    this.setState({
      submitted: true
    });
    const body = JSON.stringify({ email });

    const headers = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    // #TODO: CSRF protection is turned off, because I couldn't get this to work!
    // Fix this!!
    return fetch("/api/send_slack_invite", {
      method: "POST",
      headers,
      credentials: "same-origin",
      body
    })
      .then(response => response.json())
      .then(answer => {
        this.setState({
          success: answer["ok"]
        });
      })
      .catch(error => {
        console.log(error);
        console.log("Oops, something went wrong there");
      });

    event.preventDefault();
  }

  render() {
    const { success, emailValid, submitted } = this.state;

    return (
      <div className="container text-center" style={[styles.slackInfo]}>
        <p>
          Would you like to join the GiraffeTools Slack? Fill in your email
          address here, and you'll receive an invitation link in your inbox!
        </p>
        <img src="/static/img/separator_red.svg" style={[styles.separator]} />
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
                "alert alert-success alert-dismissible fade" +
                (submitted && success ? " show" : "")
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
                "alert alert-danger alert-dismissible fade" +
                (!emailValid ? " show" : "")
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
                "alert alert-danger alert-dismissible fade" +
                (submitted && !success ? " show" : "")
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
      </div>
    );
  }
}

export default SlackInvite;
