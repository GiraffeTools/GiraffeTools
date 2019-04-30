import React, { Fragment, useState } from "react";
import Radium from "radium";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Question from "../components/question";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API_HOST } from "../config";

import styles from "../styles/questions.js";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null
    };
  }

  async componentDidMount() {
    const response = await fetch(`${API_HOST}/faq_questions`);
    this.setState({ questions: await response.json() });
  }
  // #TODO write React Hook for this
  // const [open, toggleOpen] = useState(false);

  render() {
    const { questions } = this.state;
    const { open } = this.state;
    const { q, a } = this.props;

    return (
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
    );
  }
}

export default Radium(Questions);
