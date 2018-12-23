import React from "react";
import Radium from "radium";

import Code from "./code";
import styles from "../styles/codeEditor";

const CodeEditor = props => {
  const {
    showCodeEditor,
    setActiveTab,
    toggleCodeEditor,
    nodes,
    links,
    activeTab
  } = props;

  const languages = ["Nipype", "Docker", "MATLAB"];
  let currentTab = activeTab || "Nipype";

  return (
    <div
      style={[styles.codeWindow, showCodeEditor && styles.codeWindow.closed]}
    >
      <div>
        <div
          style={[styles.codeButton]}
          className={
            "fas " + (showCodeEditor ? "fa-angle-up" : "fa-angle-down")
          }
          onClick={() => toggleCodeEditor()}
        />
        <nav style={[styles.codeNav]}>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {languages.map(language => (
              <a
                style={[styles.codeNavItem]}
                className={
                  "nav-item nav-link" +
                  (language === currentTab ? " active" : "")
                }
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
        <div style={[styles.navTabContent]}>
          {languages.map(language => (
            <div
              key={`nav-${language}-panel`}
              className={
                "code-pane fade" +
                (language === currentTab ? " show active" : "")
              }
              id={`nav-${language}`}
              role="tabpanel"
              aria-labelledby={`nav-${language}-tab`}
              style={[styles.tabPane]}
            >
              <Code language={`${language}`} nodes={nodes} links={links} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Radium(CodeEditor);
