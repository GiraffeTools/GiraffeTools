import React, { Fragment } from "react";

import Banner from "../components/banner";
import Footer from "../components/footer";
import TryOut from "../components/tryOut";
import Questions from "../components/questions";

const Faq = () => (
  <Fragment>
    <Banner title="FAQs" />
    <Questions />
    <TryOut />
    <Footer />
  </Fragment>
);
export default Faq;
