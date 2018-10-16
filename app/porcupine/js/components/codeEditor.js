import React from "react";

import Code from "./code";

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showCodeEditor, toggleCodeEditor, nodes, links } = this.props;

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
        {/* #TODO Make this a tab editor */}
        <div className="codeEditor">
          <Code language="Nipype" nodes={nodes} links={links} />
        </div>
      </div>
    );
  }
}

export default CodeEditor;
