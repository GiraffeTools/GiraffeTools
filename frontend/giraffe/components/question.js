import React, { Fragment, useState } from "react";
import Radium from "radium";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import styles from "../styles/question.js";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  // #TODO write React Hook for this
  // const [open, toggleOpen] = useState(false);

  render() {
    const { open } = this.state;
    const { q, a } = this.props;

    return (
      <Fragment>
        <h3
          onClick={() => this.setState({ open: !open })}
          aria-controls="collapse-answer"
          aria-expanded={open}
          style={styles.header}
        >
          <img style={[styles.chevron]} src="/static/img/chevron_right.svg" />
          <span>{q}</span>
        </h3>
        <Collapse in={this.state.open}>
          <p id="collapse-answer" style={[styles.answer]}>
            {a}
          </p>
        </Collapse>
        <hr />
      </Fragment>
    );
  }
}

export default Radium(Question);
