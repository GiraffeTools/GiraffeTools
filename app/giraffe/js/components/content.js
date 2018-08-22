import React from "react";

import Contact from "./contact.js";
import Contributors from "./contributors.js";
import ExplainerVideo from "./explainerVideo.js";
import Footer from "./footer.js";
import Hero from "./hero.js";
import People from "./people.js";
import RoadMap from "./roadMap.js";
import Slack from "./slack.js";
import Thanks from "./thanks.js";
import Tools from "./tools.js";
import WhyGiraffe from "./whyGiraffe.js";


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
        <RoadMap />
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
