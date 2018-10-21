import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/light";
import atomDark from "react-syntax-highlighter/styles/hljs/atom-one-dark";

const UnknownCode = ({ nodes }) => (
  <SyntaxHighlighter style={atomDark}>
    Nothing to see here, move along!
  </SyntaxHighlighter>
);

export default UnknownCode;
