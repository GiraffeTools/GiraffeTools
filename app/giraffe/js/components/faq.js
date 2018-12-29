import React, { Fragment } from "react";
import Radium from "radium";

import Banner from "./banner";
import Footer from "./footer";
import TryOut from "./tryOut";
import Question from "./question";
import styles from "../styles/faq.js";

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null
    };
  }

  componentDidMount() {
    fetch("/api/faq_questions")
      .then(response => response.json())
      .then(questions => this.setState({ questions }));
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
