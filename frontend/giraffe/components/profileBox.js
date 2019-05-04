import React from "react";
import Radium from "radium";
import Container from "react-bootstrap/Container";
import pluralize from "pluralize";

import styles from "../styles/profileBox.js";

const ProfileBox = ({ user, active_giraffe_projects }) => (
  <div className="col-4 text-center">
    <div className="sticky-top" style={[styles.sticky]}>
      <div style={[styles.whitespace]} />
      <div style={[styles.box]}>
        <img src={user.avatar_url} style={[styles.profilePic]} />
        <h3 style={[styles.username]}>{user.login}</h3>
        <img src="/static/img/separator_grey.svg" style={[styles.separator]} />
        <Container style={styles.activeProjectCounter}>
          {active_giraffe_projects}
        </Container>
        <div style={[styles.activeGiraffeText]}>
          active GiraffeTools {pluralize("project", active_giraffe_projects)}
        </div>
        <img src="/static/img/separator_grey.svg" style={[styles.separator]} />
        {user.loggedIn && (
          <button type="button" className="btn">
            Logout
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Radium(ProfileBox);
