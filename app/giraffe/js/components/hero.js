import React from "react";
import Radium from "radium";
import Typing from "react-typing-animation";

import Navigation from "./navigation";
import LoginButton from "../containers/loginButton";
import styles from "../styles/hero.js";

const Hero = () => (
  <div style={[styles.hero]}>
    <Navigation />
    <div className="position-relative" style={[styles.heroText]}>
      <img src="/static/img/giraffetools_logo.png" style={[styles.heroLogo]} />
      <div>
        <div id="typewriter-text">
          <Typing loop={true} className="float-left">
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
        <img src="/static/img/headline_dot.svg" style={[styles.headlineDot]} />
      </div>
      <div style={[styles.heroSubtitle]}>
        Giraffe Tools are applications that make it easier to analyse all kinds
        of data!
      </div>
      <LoginButton style={[styles.heroSubtitle]} />
    </div>
  </div>
);

export default Radium(Hero);
