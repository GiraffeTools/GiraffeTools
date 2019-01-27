import React from "react";
import Radium from "radium";
import styles from "../styles/menuSlider";

const steps = 100; // Slider steps

class MenuSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.zoom = this.zoom.bind(this);
  }

  sliderToZoom(val) {
    const { minZoom, maxZoom } = this.props;
    return (val * (maxZoom - minZoom)) / steps + minZoom;
  }

  zoomToSlider(val) {
    const { minZoom, maxZoom } = this.props;
    return ((val - minZoom) * steps) / (maxZoom - minZoom);
  }

  zoom(event) {
    const { minZoom, maxZoom, zoomLevel, modifyZoom } = this.props;
    let sliderVal = event.target.value;
    let zoomLevelNext = this.sliderToZoom(sliderVal);
    let delta = zoomLevelNext - zoomLevel;

    if (zoomLevelNext <= maxZoom && zoomLevelNext >= minZoom) {
      modifyZoom(delta);
    }
  }

  render() {
    const { minZoom, maxZoom, zoomLevel } = this.props;
    return (
      <div style={styles.zoomSliderWrapper}>
        <span>-</span>
        <input
          style={styles.zoomSlider}
          type="range"
          min={this.zoomToSlider(minZoom)}
          max={this.zoomToSlider(maxZoom)}
          value={this.zoomToSlider(zoomLevel)}
          onChange={this.zoom}
          step="1"
        />
        <span>+</span>
      </div>
    );
  }
}
export default Radium(MenuSlider);
