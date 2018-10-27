import React from "react";
import { FaExpand } from "react-icons/fa";

const steps = 100; // Slider steps

class GraphControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // styles: makeStyles(props.primary)
    };
  }

  // Convert slider val (0-steps) to original zoom value range
  sliderToZoom(val) {
    return (
      (val * (this.props.maxZoom - this.props.minZoom)) / steps +
      this.props.minZoom
    );
  }
  // Convert zoom val (minZoom-maxZoom) to slider range
  zoomToSlider(val) {
    return (
      ((val - this.props.minZoom) * steps) /
      (this.props.maxZoom - this.props.minZoom)
    );
  }
  // Center graph-view on contents of svg > view
  zoomToFit() {
    this.props.zoomToFit();
  }
  // Modify current zoom of graph-view
  zoom = e => {
    let sliderVal = e.target.value;
    let zoomLevelNext = this.sliderToZoom(sliderVal);
    let delta = zoomLevelNext - this.props.zoomLevel;

    if (
      zoomLevelNext <= this.props.maxZoom &&
      zoomLevelNext >= this.props.minZoom
    ) {
      this.props.modifyZoom(delta);
    }
  };

  render() {
    return (
      <div id="zoom-controls" className="graphControls">
        <div id="zoom-slider-wrapper">
          -
          <input
            id="zoom-slider"
            type="range"
            min={this.zoomToSlider(this.props.minZoom)}
            max={this.zoomToSlider(this.props.maxZoom)}
            value={this.zoomToSlider(this.props.zoomLevel)}
            onChange={this.zoom}
            step="1"
          />
          +
        </div>
        <button id="zoom-to-fit" onMouseDown={this.props.zoomToFit}>
          <FaExpand />
        </button>
      </div>
    );
  }
}

export default GraphControls;
