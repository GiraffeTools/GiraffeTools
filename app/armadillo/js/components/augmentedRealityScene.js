import React from "react";
import Radium from "radium";
// import { Entity, Scene } from 'aframe-react';
// import {Box, Sphere, Cylinder, Plane, Sky, Text, Scene} from 'react-aframe-ar';
import styles from "../styles/augmentedRealityScene";
// import ARjs from 'ar.js'

class AugmentedRealityScene extends React.Component {
  async componentWillMount() {
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
  }

  render() {
    const { image_id } = this.props;

    return (
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
    );
  }
}
export default Radium(AugmentedRealityScene);
