import React, { useState } from "react";
import Radium from "radium";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {
  browserName,
  browserVersion,
  fullBrowserVersion,
  isChrome,
  inspect
} from "react-device-detect";
import { useCookies } from "react-cookie";

let chrome = "";
let warning = "";
import alertStyles from "../styles/alerts";
import styles from "../styles/unhappyBrowser";

const minimumBrowsers = {
  chrome: "42", // verified: 41 and below = problems
  opera: "99999", // not verified #TODO
  firefox: "99999", // weird problems #TODO
  safari: "12", // not verified #TODO
  chromium: "42", // not verified #TODO
  "internet explorer": "99999" // not verified, but just don't
};

const UnhappyBrowser = () => {
  const [cookies, setCookie] = useCookies(["browser"]);
  const happy = isChrome && parseInt(browserVersion, 10) > 42;
  if (happy || cookies.browser === "closed") return null;

  return (
    <Alert dismissible={false} variant="primary" style={alertStyles.alert}>
      <Alert.Heading>
        Use a different browser for an optimal experience
      </Alert.Heading>
      <p>
        <span>
          We have detected that you are using an browser in which some
          functionality might not work as expected. We advise to use the latest
          version of Chrome.
        </span>
        <a href="http://www.google.com/chrome/" style={styles.chrome}>
          <img
            src="/static/img/chrome.svg"
            alt="install or upgrade chrome"
            style={styles.logo}
          />
        </a>
      </p>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => setCookie("browser", "closed")}
          variant="outline-primary"
        >
          Close
        </Button>
      </div>
    </Alert>
  );
};

export default UnhappyBrowser;
