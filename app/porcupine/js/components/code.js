import React from "react";
import NipypeCode from "./codeGenerators/nipype";
import DockerCode from "./codeGenerators/docker";
import UnknownCode from "./codeGenerators/unknown";

const Code = ({ nodes, links, language }) => {
  let code = "";
  switch (language) {
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
};

export default Code;
