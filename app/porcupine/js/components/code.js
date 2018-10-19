import React from "react";
import NipypeCode from "./codeGenerators/nipype";
import DockerCode from "./codeGenerators/docker";
import UnknownCode from "./codeGenerators/unknown";

class Code extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { nodes, links } = this.props;

    let code = "";
    switch (this.props.language) {
      case "Nipype":
        code = <NipypeCode nodes={nodes} links={links} />;
        break;
      case "Docker":
        code = <DockerCode nodes={nodes} />;
        break;
      default:
        code = <UnknownCode />;
        break;
    }
    return code;
  }
}

export default Code;
