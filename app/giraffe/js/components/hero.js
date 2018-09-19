import React from "react";
import Typing from "react-typing-animation";

import Navbar from "./navbar";

const Hero = () => (
  <div id="hero">
    <Navbar />
    <img src="/static/img/giraffetools_logo.png" id="banner-logo" />

    <h1>
      Open
      <Typing loop={true}>
        Science
        <Typing.Delay ms={2000} />
        <Typing.Backspace count={7} />
        Software
        <Typing.Delay ms={2000} />
        <Typing.Backspace count={8} />
        Code
        <Typing.Delay ms={2000} />
        <Typing.Backspace count={4} />
        Analysis
        <Typing.Delay ms={2000} />
        <Typing.Backspace count={8} />
      </Typing>
      <img src="/static/img/headline_dot.svg" />
    </h1>
    <h3>
      Giraffe Tools are applications that make it easier to analyse all kinds of
      data
    </h3>
    <button>Login with GitHub</button>
  </div>
);

export default Hero;
