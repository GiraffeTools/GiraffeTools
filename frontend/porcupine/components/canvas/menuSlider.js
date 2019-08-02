import React from 'react';
import styles from '../../styles/menuSlider';

const steps = 100; // Slider steps

const MenuSlider = (props) => {
  const {minZoom, maxZoom, zoomLevel, modifyZoom} = props;

  const sliderToZoom = (val) => (val * (maxZoom - minZoom)) / steps + minZoom;
  const zoomToSlider= (val) => ((val - minZoom) * steps) / (maxZoom - minZoom);
  const zoom = (event) => {
    const sliderVal = event.target.value;
    const zoomLevelNext = sliderToZoom(sliderVal);
    const delta = zoomLevelNext - zoomLevel;

    if (zoomLevelNext <= maxZoom && zoomLevelNext >= minZoom) {
      modifyZoom(delta);
    }
  };

  return (
    <div style={styles.zoomSliderWrapper}>
      <span>-</span>
      <input
        style={styles.zoomSlider}
        type="range"
        min={zoomToSlider(minZoom)}
        max={zoomToSlider(maxZoom)}
        value={zoomToSlider(zoomLevel)}
        onChange={zoom}
        step="1"
      />
      <span>+</span>
    </div>
  );
};
export default MenuSlider;
