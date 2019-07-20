import React, {Fragment, useState} from 'react';
import Collapse from 'react-bootstrap/Collapse';

import styles from '../styles/question.js';

const Question = (props) => {
  const [open, toggleOpen] = useState(false);
  const {q, a} = props;

  return (
    <Fragment>
      <h3
        onClick={() => toggleOpen(!open)}
        aria-controls="collapse-answer"
        aria-expanded={open}
        style={styles.header}
      >
        <img style={styles.chevron} src="/static/img/chevron_right.svg" />
        <span>{q}</span>
      </h3>
      <Collapse in={open}>
        <p id="collapse-answer" style={styles.answer}>
          {a}
        </p>
      </Collapse>
      <hr />
    </Fragment>
  );
};

export default Question;
