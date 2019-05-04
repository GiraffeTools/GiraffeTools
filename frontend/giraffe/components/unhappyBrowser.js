import React from "react";
import Radium from "radium";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import bowser from "bowser";

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

class UnhappyBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      happy: true,
      visible: true
    };
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    // in case we'd like to pass on the browser info directly:
    const { ua } = this.props;
    this.setState({
      happy: bowser.check(
        minimumBrowsers,
        true,
        ua || window.navigator.userAgent
      )
    });
  }

  onClose() {
    this.setState({ visible: false });
  }

  render() {
    const { happy } = this.state;
    const { open, toggleBrowserAlert } = this.props;

    return happy || !open ? null : (
      <Alert dismissible={true} variant="primary" onClose={toggleBrowserAlert}>
        <Alert.Heading>
          Use a different browser for an optimal experience
        </Alert.Heading>
        <p>
          We have detected that you are using an browser in which some
          functionality might not work as expected. We advise to use the latest
          version of Chrome.
          <a href="http://www.google.com/chrome/" style={[styles.chrome]}>
            <img src="/static/img/chrome.svg" alt="install or upgrade chrome" />
          </a>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleHide} variant="outline-success">
            &times;
          </Button>
        </div>
      </Alert>
    );
  }
}

export default Radium(UnhappyBrowser);
