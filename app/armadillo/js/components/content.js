import React from "react";
import Radium from "radium";

import MarkerWindow from "./markerWindow";
import { isGitHash } from "../utils";


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const { username, repository, branchOrCommit } = this.props.match.params;
    const { setUser, setRepository, setBranch, setCommit } = this.props;
    setUser(username);
    setRepository(repository);
    let string = branchOrCommit || "master";
    let isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);

    // AFRAME.registerComponent('model-overrider', {
    //   init: function() {
    //     this.el.addEventListener('model-loaded', function(e) {
    //       var model = e.detail.model;
    //       model.traverse(function(o) {
    //         if (o instanceof THREE.Mesh) {
    //           // modify o.material or o.geometry here.
    //           o.material.vertexColors = THREE.VertexColors
    //         }
    //       });
    //     });
    //   }
    // });
  }

  componentDidMount() {

  }

  render() {

    // const { image_id } = this.props;
    const image_id = 31997;
    return (
      <div>
        <MarkerWindow image_id={image_id} />
        <div id="camdiv">
          <a-scene className="scene" embedded arjs='trackingMethod: best; debugUIEnabled:true'>
            <a-assets>
              <a-asset-item id="rh-model" src={`/api/armadillo/neurovault/${image_id}/models/right`} crossOrigin="anonymous"></a-asset-item>
              <a-asset-item id="lh-model" src={`/api/armadillo/neurovault/${image_id}/models/left`} crossOrigin="anonymous"></a-asset-item>
            </a-assets>
            <a-marker model-overrider preset='custom' type='pattern' url='/static/img/patt/pattern-marker.patt' arjs='markersAreaEnabled:true'>
            <a-collada-model src="#rh-model"  position="0 0 0" scale="0.01 0.01 0.01" rotation="0 180 0">
              <a-animation attribute="rotation" to="0 180 360" dur="5000" easing='linear' repeat="indefinite"></a-animation>
            </a-collada-model>
            <a-collada-model src="#lh-model"  position="0 0 0" scale="0.01 0.01 0.01" rotation="0 180 0" material='opacity: 0.5;'>
              <a-animation attribute="rotation" to="0 180 360" dur="5000" easing='linear' repeat="indefinite"></a-animation>
            </a-collada-model>
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        </div>
      </div>
    );
  }
}

export default Radium(Content);
