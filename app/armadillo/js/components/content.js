import React from "react";
import Radium from "radium";
import { load as loadYaml } from "yaml-js";

import MarkerWindow from "./markerWindow";
import { isGitHash } from "../utils";
import styles from "../styles/content";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_id: null
    };
  }

  async componentWillMount() {
    const { username, repository, branchOrCommit } = this.props.match.params;
    const { setUser, setRepository, setBranch, setCommit } = this.props;
    setUser(username);
    setRepository(repository);
    let string = branchOrCommit || "master";
    let isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);

    AFRAME.registerComponent("model-overrider", {
      init: function() {
        this.el.addEventListener("model-loaded", function(e) {
          var model = e.detail.model;
          model.traverse(function(o) {
            if (o instanceof THREE.Mesh) {
              // modify o.material or o.geometry here.
              o.material.vertexColors = THREE.VertexColors;
            }
          });
        });
      }
    });

    const baseName = `https://raw.githubusercontent.com/${username}/${repository}/${branchOrCommit}`;
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
    const { image_id } = this.state;

    return (
      <div>
        <MarkerWindow
          image_id={image_id}
          user={username}
          repository={repository}
        />
        {image_id && (
          <div id="camdiv">
            <a-scene
              embedded
              arjs="trackingMethod: best; debugUIEnabled:false"
              style={[styles.scene]}
            >
              <a-assets>
                <a-asset-item
                  id="rh-model"
                  src={`/api/armadillo/neurovault/${image_id}/models/right`}
                  crossOrigin="anonymous"
                />
                <a-asset-item
                  id="lh-model"
                  src={`/api/armadillo/neurovault/${image_id}/models/left`}
                  crossOrigin="anonymous"
                />
              </a-assets>
              <a-marker
                model-overrider
                preset="custom"
                type="pattern"
                url="/static/img/patt/pattern-marker.patt"
                arjs="markersAreaEnabled:true"
              >
                <a-collada-model
                  src="#rh-model"
                  position="0 0 0"
                  scale="0.01 0.01 0.01"
                  rotation="0 180 0"
                >
                  <a-animation
                    attribute="rotation"
                    to="0 180 360"
                    dur="5000"
                    easing="linear"
                    repeat="indefinite"
                  />
                </a-collada-model>
                <a-collada-model
                  src="#lh-model"
                  position="0 0 0"
                  scale="0.01 0.01 0.01"
                  rotation="0 180 0"
                  material="opacity: 0.5;"
                >
                  <a-animation
                    attribute="rotation"
                    to="0 180 360"
                    dur="5000"
                    easing="linear"
                    repeat="indefinite"
                  />
                </a-collada-model>
              </a-marker>
              <a-entity camera />
            </a-scene>
          </div>
        )}
      </div>
    );
  }
}

export default Radium(Content);
