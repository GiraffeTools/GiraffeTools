import React from 'react';
import Radium from 'radium';
import {Entity} from 'aframe-react';
import styles from '../styles/augmentedRealityScene';
// import ARjs from 'ar.js'

class AugmentedRealityScene extends React.Component {
  // eslint-disable-next-line
  async UNSAFE_componentWillMount() {
    AFRAME.registerComponent('model-overrider', {
      init: function() {
        console.log('Add model overrider to add colours');
        this.el.addEventListener('model-loaded', function(e) {
          const model = e.detail.model;
          model.traverse(function(o) {
            if (o instanceof THREE.Mesh) {
              o.material.vertexColors = THREE.VertexColors;
            }
          });
        });
      },
    });
  }

  render() {
    const {imageId} = this.props;

    return (
      <a-scene
        inspector="https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js"
        embedded
        arjs="trackingMethod: best; debugUIEnabled:false"
        style={[styles.scene]}
      >
        <a-assets>
          <a-asset-item
            id="rh-model"
            src={`/api/armadillo/neurovault/${imageId}/models/right`}
            // eslint-disable-next-line
            crossOrigin="anonymous"
          />
          <a-asset-item
            id="lh-model"
            src={`/api/armadillo/neurovault/${imageId}/models/left`}
            // eslint-disable-next-line
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
          <Entity
            primitive="a-collada-model"
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
          </Entity>
          <Entity
            primitive="a-collada-model"
            src="#lh-model"
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
          </Entity>
        </a-marker>
        <a-entity camera />
      </a-scene>
    );
  }
}
export default Radium(AugmentedRealityScene);
