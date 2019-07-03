import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import dynamicImports from "dynamic-imports";

import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import matlab from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import dockerfile from "react-syntax-highlighter/dist/esm/languages/hljs/dockerfile";
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("dockerfile", dockerfile);
SyntaxHighlighter.registerLanguage("matlab", matlab);

const unknownCode = "Nothing to see here, move along!";

async function recomputeCode(generator, nodes, links) {
  if (generator) {
    let code;
    try {
      code = await generator(nodes, links);
    } catch (error) {
      console.error("There was an error in your code generator: ", error);
      return unknownCode;
    }
    if (typeof code !== "string") {
      debugger;
      console.error("The created code is not a string");
      return unknownCode;
    }
    return code;
  }
  return unknownCode;
}

const interval = 1000; //ms
const generateCodeDebounced = AwesomeDebouncePromise(recomputeCode, interval, {
  key: language => language
});

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      computing: false,
      current_props: {},
      generator: () => {}
    };
    this.generateCode = this.generateCode.bind(this);
  }

  componentDidMount() {
    this.generateCode();
  }

  static getDerivedStateFromProps(nextProps, prev_state) {
    if (
      prev_state.current_props.nodes !== nextProps.nodes &&
      prev_state.current_props.links !== nextProps.links
    ) {
      return {
        ...prev_state,
        computing: true,
        current_props: nextProps
      };
    }
    return null;
  }

  componentDidUpdate(prev_props, prev_state) {
    if (
      (this.props.nodes.length || this.props.links.length) &&
      (prev_props.nodes !== this.props.nodes ||
        prev_props.links !== this.props.links)
    ) {
      this.generateCode();
    }
  }

  async generateCode() {
    const { grammar, nodes, links } = this.props;
    const code = await generateCodeDebounced(
      grammar && grammar.generator,
      nodes,
      links
    );
    this.setState({ code, computing: false });
  }

  render() {
    const { code } = this.state;
    const { grammar } = this.props;
    const format = grammar && grammar.format;

    return (
      <SyntaxHighlighter language={format} style={atomDark}>
        {code}
      </SyntaxHighlighter>
    );
  }
}

export default Code;
