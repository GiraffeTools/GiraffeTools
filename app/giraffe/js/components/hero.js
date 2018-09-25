import React from "react";
import Typing from "react-typing-animation";

import Navbar from "./navigation";

const Hero = () => (
  <div id="hero">
    <Navbar />
    <img src="/static/img/giraffetools_logo.png" id="hero-logo" />
    <div>
      <div id="typewriter-text">
        <Typing loop={true}>
          Open Science
          <Typing.Delay ms={4000} />
          <Typing.Backspace count={7} />
          Software
          <Typing.Delay ms={4000} />
          <Typing.Backspace count={8} />
          Code
          <Typing.Delay ms={4000} />
          <Typing.Backspace count={4} />
          Analysis
          <Typing.Delay ms={4000} />
          <Typing.Backspace count={8} />
        </Typing>
      </div>
      <img id="headline-dot" src="/static/img/headline_dot.svg" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <div>
      Giraffe Tools are applications that make it easier to analyse all kinds of
      data!
      <br />
      <a
        type="button btn-primary btn-lg "
        className="btn giraffe-button"
        href="/_github/auth"
      >
        <img src="/static/img/gh-icon-white.svg" id="github-button" />
        Login with GitHub
      </a>
    </div>
  </div>
);

export default Hero;
