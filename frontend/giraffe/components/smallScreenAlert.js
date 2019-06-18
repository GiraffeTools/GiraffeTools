import React, { useState } from "react";
import { StyleRoot } from "radium";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";

import alertStyles from "../styles/alerts";
import styles from "../styles/smallScreenAlert";

const SmallScreenAlert = () => {
  const [cookies, setCookie] = useCookies(["smallScreen"]);
  if (cookies.smallScreen === "closed") return null;

  return (
    <StyleRoot>
      <div style={[alertStyles.alert, styles.smallScreen]}>
        <Alert dismissible={false} variant="primary" closeLabel="test">
          <Alert.Heading>
            You're viewing this page on a small screen
          </Alert.Heading>
          <p>
            Welcome! This website has not been optimised for small screens so
            things might look a bit quirky!
          </p>
          <hr />
          <div className="d-flex justify-content-center">
            <Button
              onClick={() => setCookie("smallScreen", "closed")}
              variant="outline-primary"
            >
              Close
            </Button>
          </div>
        </Alert>
      </div>
    </StyleRoot>
  );
};

export default SmallScreenAlert;
