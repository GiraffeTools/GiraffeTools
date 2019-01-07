import React from "react";
import Radium from "radium";
import bowser from "bowser";

// import chrome from './assets/chrome.jpg'
// import warning from './assets/warning.jpg'

let chrome = "";
let warning = "";
import alertStyles from "../styles/alerts";
import styles from "../styles/unhappyBrowser";

const minimumBrowsers = {
  chrome: "40",
  chromium: "40",
  googlebot: "0",
  firefox: "99999"
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
    return happy ? null : (
      <div
        className="alert alert-info alert-dismissible fade show"
        style={[styles.unhappyBrowser, alertStyles.alert]}
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
        We have detected that you are using an incompatible browser. This site
        may not work as expected.
      </div>
    );
  }
}

export default Radium(UnhappyBrowser);
