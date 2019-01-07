import React, { Fragment } from "react";
import Radium from "radium";

import Banner from "./banner";
import Footer from "./footer";
import TryOut from "./tryOut";
import Question from "./question";
import styles from "../styles/faq.js";
import { API_HOST } from "../config";

class Faq extends React.Component {
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

  render() {
    const { questions } = this.state;

    return (
      <Fragment>
        <Banner title="FAQs" />
        <ul style={[styles.faqQuestionList]}>
          {questions &&
            questions.map(question => (
              <Question key={question.id} {...question} />
            ))}
        </ul>
        <TryOut />
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(Faq);
