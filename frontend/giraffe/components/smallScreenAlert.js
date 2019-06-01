import React, { useState } from "react";
import { StyleRoot } from "radium";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import alertStyles from "../styles/alerts";
import styles from "../styles/smallScreenAlert";

const SmallScreenAlert = () => {
  const [show, handleHide] = useState(true);
  return (
    <StyleRoot>
      <div style={[alertStyles.alert, styles.smallScreen]}>
        <Alert
          show={show}
          dismissible={false}
          variant="primary"
          closeLabel="test"
        >
          <Alert.Heading>
            You're viewing this page on a small screen
          </Alert.Heading>
          <p>
            Welcome! This website has not been optimised for small screens so
            things might look a bit quirky!
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => handleHide(false)} variant="outline-primary">
              Close
            </Button>
          </div>
        </Alert>
      </div>
    </StyleRoot>
  );
};

export default SmallScreenAlert;
