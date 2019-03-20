import React, { Fragment } from "react";
import Radium from "radium";

import Banner from "../components/banner";
import Footer from "../components/footer";
import TryOut from "../components/tryOut";
import Question from "../components/question";
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
        <div className="container">
          <ul style={[styles.faqQuestionList]}>
            {questions &&
              questions.map(question => (
                <Question key={question.id} {...question} />
              ))}
          </ul>
        </div>
        <TryOut />
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(Faq);
