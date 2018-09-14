import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import SlackBanner from "./slackBanner";

const Question = question => {
  return (
    <li>
      <div className="question">
        {question.q}
      </div>
      <div className="answer">
        {question.a}
      </div>
    </li>
  );
}

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
        <Banner />
        <ul className="question-list">
          {questions &&
            questions.map(question => (
              <Question key={question.id} {...question} />
            ))}
        </ul>
        <SlackBanner />
        <Footer />
      </Fragment>
    );
  }
}

export default Faq;
