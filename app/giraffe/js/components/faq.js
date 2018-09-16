import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import TryOut from "./tryOut";

const Question = question => {
  return (
    <li>
      <div className="question">{question.q}</div>
      <div className="answer">{question.a}</div>
    </li>
  );
};

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
        <ul className="faq-question-list">
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

export default Faq;
