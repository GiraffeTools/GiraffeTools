import React, { Fragment, useState } from "react";
import Radium from "radium";
import Container from "react-bootstrap/Container";
import Question from "../components/question";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API_HOST } from "../config";
import Async from "react-async";

import styles from "../styles/questions.js";

const loadQuestions = () =>
  fetch(`${API_HOST}/faq_questions`).then(response => response.json());

const Questions = () => (
  <Async promiseFn={loadQuestions}>
    <Async.Loading>Loading...</Async.Loading>
    <Async.Fulfilled>
      {questions => (
        <Container fluid={true} style={styles.container}>
          <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              {questions &&
                questions.map(question => (
                  <Question key={question.id} {...question} />
                ))}
            </Col>
          </Row>
        </Container>
      )}
    </Async.Fulfilled>
    <Async.Rejected>
      {error => `Something went wrong: ${error.message}`}
    </Async.Rejected>
  </Async>
);

export default Radium(Questions);
