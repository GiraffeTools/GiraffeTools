import React, { useState } from "react";
import { StyleRoot } from "radium";
import Helmet from "react-helmet";

import Code from "./code";
import styles from "../../styles/codeEditor";

require("../../scss/code.scss");

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleScriptInject({ scriptTags }) {
    if (scriptTags) {
      const scriptTag = scriptTags[0];
      scriptTag.onload = this.handleOnLoad;
    }
  }

  render() {
    const {
      showSidebar,
      setActiveTab,
      nodes,
      links,
      languages,
      activeTab,
      grammars
    } = this.props;
    const { open } = this.state;
    let currentTab = activeTab || languages[0];

    const grammarScipts = grammars.map((grammar, index) => (
      <Helmet
        key={index}
        script={[{ src: grammar.script }]}
        type="text/javascript"
        headers={{
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "text/javascript"
        }}
        // Helmet doesn't support `onload` in script objects so we have to hack in our own
        onChangeClientState={(newState, addedTags) =>
          this.handleScriptInject(addedTags)
        }
      />
    ));

    return (
      <StyleRoot
        style={[
          styles.codeWindow,
          !open && styles.codeWindow.closed,
          open && styles.codeWindow.withSidebar
        ]}
      >
        {/*grammarScipts*/}
        <div>
          <div
            style={[styles.codeButton]}
            // #TODO replace this with react-icons/fa
            className={"fas " + (open ? "fa-angle-down" : "fa-angle-up")}
            onClick={() => this.setState({ open: !open })}
          />
          <nav style={[styles.codeNav]}>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {languages.map(language => (
                <a
                  style={[
                    styles.codeNavItem,
                    language === currentTab && styles.codeNavItem.active
                  ]}
                  className="nav-item nav-link"
                  key={`nav-${language}-tab`}
                  id={`nav-${language}-tab`}
                  data-toggle="tab"
                  role="tab"
                  aria-controls={`nav-${language}`}
                  aria-selected="true"
                  onClick={() => setActiveTab(language)}
                >
                  {`${language}`}
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div>
          <div style={[styles.navTabContent]} className="tab-content">
            {languages.map(language => (
              <div
                key={`nav-${language}-panel`}
                className={
                  "tab-pane" + (language === currentTab ? " show active" : "")
                }
                id={`nav-${language}`}
                role="tabpanel"
                aria-labelledby={`nav-${language}-tab`}
              >
                <Code language={`${language}`} nodes={nodes} links={links} />
              </div>
            ))}
          </div>
        </div>
      </StyleRoot>
    );
  }
}

export default CodeEditor;
