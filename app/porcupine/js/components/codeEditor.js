import React from "react";

import Code from "./code";

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showCodeEditor,
      setActiveTab,
      toggleCodeEditor,
      nodes,
      links,
      activeTab
    } = this.props;

    const languages = ["Nipype", "Docker", "MATLAB"];

    return (
      <div
        className={"codeWindow " + (showCodeEditor ? "codeWindowClosed" : "")}
      >
        <div
          className={
            "codeButton fas " +
            (showCodeEditor ? "fa-angle-up" : "fa-angle-down")
          }
          onClick={() => toggleCodeEditor()}
        />
        <div className="codeEditor">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {languages.map(language => (
                <a
                  className={
                    "nav-item nav-link code-nav" +
                    (language === activeTab ? " active" : "")
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
          <div className="tab-content" id="nav-tabContent">
            {languages.map(language => (
              <div
                key={`nav-${language}-panel`}
                className={
                  "tab-pane fade" +
                  (language === activeTab ? " show active" : "")
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
      </div>
    );
  }
}

export default CodeEditor;
