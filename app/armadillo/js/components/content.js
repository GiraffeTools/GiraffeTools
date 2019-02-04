import React from "react";
import Radium from "radium";
import { load as loadYaml } from "yaml-js";

import AugmentedRealityScene from "./augmentedRealityScene";
import MarkerWindow from "./markerWindow";
import { isGitHash } from "../utils";
import styles from "../styles/content";

import "aframe";
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_id: null,
      aframe_loaded: false
    };
  }

  async componentWillMount() {
    const script = document.createElement("script");
    script.src = "/static/js/aframe-ar.js";
    script.async = false;
    document.head.appendChild(script);

    const check_aframe = async () => {
      if (window.AFRAME !== undefined) {
        this.setState({ aframe_loaded: true });
        clearInterval(this.interval);
      }
    };
    this.interval = setInterval(check_aframe, 1000);

    const { username, repository, branchOrCommit } = this.props.match.params;
    const { setUser, setRepository, setBranch, setCommit } = this.props;
    setUser(username);
    setRepository(repository);
    let identifierString = branchOrCommit || "master";
    let isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && identifierString);
    setBranch(!isCommit && identifierString);

    const baseName = `https://raw.githubusercontent.com/${username}/${repository}/${identifierString}`;
    const configFile = `${baseName}/GIRAFFE.yml`;

    const configuration = await fetch(configFile);
    if (!configuration.ok) {
      console.log("GiraffeTools configuration file cannot be loaded");
      return;
    }
    const yamlData = loadYaml(await configuration.text());
    const armadilloFile = yamlData.tools.armadillo.neurovault[0];
    this.setState({
      image_id: armadilloFile
    });
  }

  render() {
    const { username, repository } = this.props.match.params;
    const { image_id, aframe_loaded } = this.state;

    return (
      <div>
        <MarkerWindow
          image_id={image_id}
          user={username}
          repository={repository}
        />
        {image_id && (
          <div id="camdiv">
            <AugmentedRealityScene image_id={image_id} />
          </div>
        )}
      </div>
    );
  }
}

export default Radium(Content);
