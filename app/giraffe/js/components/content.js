import React from "react";

import Contact from "./contact";
import Contributors from "./contributors";
import ExplainerVideo from "./explainerVideo";
import Footer from "./footer";
import Hero from "./hero";
import People from "./people";
import Roadmap from "./roadmap";
import Slack from "./slack";
import Thanks from "./thanks";
import Tools from "./tools";
import WhyGiraffe from "./whyGiraffe";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Hero />
        <Tools />
        <ExplainerVideo />
        <Roadmap />
        <WhyGiraffe />
        <People />
        <Contributors />
        <Thanks />
        <Contact />
        <Slack />
        <Footer />
      </div>
    );
  }
}

export default Content;
