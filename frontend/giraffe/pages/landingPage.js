import React, {Fragment} from 'react';

import Contact from '../components/contact';
import Contributors from '../components/contributors';
import ExplainerVideo from '../components/explainerVideo';
import Footer from '../components/footer';
import Hero from '../components/hero';
import People from '../components/people';
import Roadmap from '../components/roadmap';
import SlackBanner from '../components/slackBanner';
import Thanks from '../components/thanks';
import Tools from '../components/tools';
import WhyGiraffe from '../components/whyGiraffe';

const LandingPage = () => (
  <Fragment>
    <Hero />
    <Tools />
    <ExplainerVideo />
    <Roadmap />
    <WhyGiraffe />
    <People />
    <Contributors />
    <Thanks />
    <Contact />
    <SlackBanner />
    <Footer />
  </Fragment>
);

export default LandingPage;
