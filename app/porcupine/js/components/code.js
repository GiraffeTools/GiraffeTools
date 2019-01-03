import React from "react";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/light";
import python from "react-syntax-highlighter/languages/hljs/python";
import dockerfile from "react-syntax-highlighter/languages/hljs/dockerfile";
import atomDark from "react-syntax-highlighter/styles/hljs/atom-one-dark";

registerLanguage("python", python);
registerLanguage("dockerfile", dockerfile);

import nipypeCode from "../utils/codeGenerators/nipype";
import dockerCode from "../utils/codeGenerators/docker";
import unknownCode from "../utils/codeGenerators/unknown";

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  render() {
    const { nodes, links, language } = this.props;
    let code = "";
    let formatting = "";
    switch (language) {
      case "Nipype":
        formatting = "python";
        code = nipypeCode(nodes, links);
        break;
      case "Docker":
        formatting = "dockerfile";
        code = dockerCode(nodes, links);
        break;
      default:
        formatting = "";
        code = unknownCode();
        break;
    }
    return (
      <SyntaxHighlighter language={formatting} style={atomDark}>
        {code}
      </SyntaxHighlighter>
    );
  }
}

export default Code;
