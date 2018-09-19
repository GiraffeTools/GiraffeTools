import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import TryOut from "./tryOut";

const Question = question => {
  return (
    <li>
      <div className="question">
        <img src="/static/img/chevron_right.svg" />
        <h3>{question.q}</h3>
      </div>
      <br />
      <div className="answer panel-collapse">{question.a}</div>
      <svg width="80%" height="3">
        <line x1="0" y1="0" x2="80%" y2="0" stroke="grey" />
      </svg>
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
