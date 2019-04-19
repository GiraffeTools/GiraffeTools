import React from "react";
import { StyleRoot } from "radium";
import Typing from "react-typing-animation";

import Navigation from "../containers/navigation";
import LoginButton from "../containers/loginButton";
import styles from "../styles/hero.js";

const Hero = () => (
  <StyleRoot>
    <div style={[styles.hero]}>
      <Navigation />
      <div className="position-relative" style={[styles.heroText]}>
        <img
          src="/static/img/giraffetools_logo.png"
          style={[styles.heroLogo]}
        />
        <div>
          <div
            className="row"
            id="typewriter-text"
            style={[styles.typewriterText]}
          >
            <div style={[styles.open]}>Open</div>
            <Typing loop={true} className="float-left">
              Science
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
            <img
              src="/static/img/headline_dot.svg"
              style={[styles.headlineDot]}
            />
          </div>
        </div>
        <div style={[styles.heroSubtitle]}>
          Giraffe Tools are applications that help you to analyse all kinds of
          data!
        </div>
        <LoginButton style={[styles.heroSubtitle]} />
      </div>
    </div>
  </StyleRoot>
);

export default Hero;
