import React from "react";
import { StyleRoot } from "radium";
import * as d3 from "d3";

import CustomDragLayer from "../../draggables/customDragLayer";
import ZoomMenu from "./menuSlider";
import Links from "./links";
import Nodes from "./nodes";
import Toolbar from "../../containers/toolbar";
import styles from "../../styles/graphView";

const defaults = {
  minZoom: 0.15,
  maxZoom: 1.5,
  gridSpacing: 36,
  gridDot: 2,
  gridSize: 40960,
  zoomDuration: 750
};

const Background = () => (
  <rect
    className="background"
    x={-defaults.gridSize / 4}
    y={-defaults.gridSize / 4}
    width={defaults.gridSize}
    height={defaults.gridSize}
    fill="url(#grid)"
  />
);

class GraphView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTransform: d3.zoomIdentity
    };
    this.modifyZoom = this.modifyZoom.bind(this);
    this.renderDefs = this.renderDefs.bind();
    this.handleZoom = this.handleZoom.bind(this);
    this.handleZoomToFit = this.handleZoomToFit.bind(this);

    this.zoom = d3
      .zoom()
      .scaleExtent([defaults.minZoom, defaults.maxZoom])
      .on("zoom", this.handleZoom);
  }

  componentDidMount() {
    d3.select(this.viewWrapper)
      .on("touchstart", this.containZoom)
      .on("touchmove", this.containZoom);
    // .on("click", this.handleSvgClicked)
    d3.select(this.viewWrapper)
      .select("svg")
      .call(this.zoom);
  }

  // Keeps 'zoom' contained
  containZoom() {}

  // View 'zoom' handler
  handleZoom() {
    this.setState({
      viewTransform: d3.event.transform
    });
  }

  getViewTransform() {
    return this.state.viewTransform;
  }

  // Zooms to contents of this.refs.entities
  handleZoomToFit() {
    const parent = d3.select(this.viewWrapper).node();
    const entities = d3.select(this.entities).node();

    if (entities.childElementCount == 0) {
      return;
    }

    const viewBBox = entities.getBBox();

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    let translate = [this.state.viewTransform.x, this.state.viewTransform.y],
      next = {
        x: translate[0],
        y: translate[1],
        k: this.state.viewTransform.k
      };

    if (viewBBox.width > 0 && viewBBox.height > 0) {
      // There are entities
      let dx = viewBBox.width,
        dy = viewBBox.height,
        x = viewBBox.x + viewBBox.width / 2,
        y = viewBBox.y + viewBBox.height / 2;

      next.k = 0.9 / Math.max(dx / width, dy / height);

      if (next.k < this.props.minZoom) {
        next.k = this.props.minZoom;
      } else if (next.k > this.props.maxZoom) {
        next.k = this.props.maxZoom;
      }

      next.x = width / 2 - next.k * x;
      next.y = height / 2 - next.k * y;
    } else {
      next.k = (this.props.minZoom + this.props.maxZoom) / 2;
      next.x = 0;
      next.y = 0;
    }

    this.setZoom(next.k, next.x, next.y, defaults.zoomDuration);
  }

  // Updates current viewTransform with some delta
  modifyZoom(modK = 0, modX = 0, modY = 0, dur = 0) {
    const parent = d3.select(this.viewWrapper).node();
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    let center = [width / 2, height / 2],
      extent = this.zoom.scaleExtent(),
      translate = [this.state.viewTransform.x, this.state.viewTransform.y],
      next = {
        x: translate[0],
        y: translate[1],
        k: this.state.viewTransform.k
      };

    const target_zoom = next.k * (1 + modK);
    if (target_zoom < extent[0] || target_zoom > extent[1]) {
      return false;
    }

    const translate0 = [
      (center[0] - next.x) / next.k,
      (center[1] - next.y) / next.k
    ];
    next.k = target_zoom;

    const l = [
      translate0[0] * next.k + next.x,
      translate0[1] * next.k + next.y
    ];
    next.x += center[0] - l[0] + modX;
    next.y += center[1] - l[1] + modY;
    this.setZoom(next.k, next.x, next.y, dur);
  }

  // Programmatically resets zoom
  setZoom(k = 1, x = 0, y = 0, dur = 0) {
    var t = d3.zoomIdentity.translate(x, y).scale(k);
    d3.select(this.viewWrapper)
      .select("svg")
      .transition()
      .duration(dur)
      .call(this.zoom.transform, t);
  }

  renderDefs() {
    return (
      <defs>
        <pattern
          id="grid"
          key="grid"
          width={defaults.gridSpacing}
          height={defaults.gridSpacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={defaults.gridSpacing / 2}
            cy={defaults.gridSpacing / 2}
            r={defaults.gridDot}
            fill="lightgray"
          />
        </pattern>

        <filter id="selection-glow">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0   0
                       0 0 0 0   0
                       0 0 0 0   0
                       0 0 0 0.7 0"
          />
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    );
  }

  render() {
    const { nodes, links, deleteSelection } = this.props;
    const view = d3.select(this.view);
    const viewNode = view.node();
    if (viewNode) {
      const { k, x, y } = this.state.viewTransform;
      view.attr("transform", this.state.viewTransform);
    }

    return (
      <StyleRoot>
        <div style={[styles.viewWrapper]} ref={el => (this.viewWrapper = el)}>
          <Toolbar
            zoomToFit={this.handleZoomToFit}
            deleteSelection={deleteSelection}
          />
          <svg height="100%" width="100%">
            {this.renderDefs()}
            <g className="view" ref={el => (this.view = el)}>
              <Background />
              <g className="entities" ref={el => (this.entities = el)}>
                <Nodes nodes={nodes} />
                <Links links={links} />
                <CustomDragLayer />
              </g>
            </g>
          </svg>
          <ZoomMenu
            minZoom={defaults.minZoom}
            maxZoom={defaults.maxZoom}
            zoomLevel={this.state.viewTransform.k}
            zoomToFit={this.handleZoomToFit}
            modifyZoom={this.modifyZoom}
          />
        </div>
      </StyleRoot>
    );
  }
}

export default GraphView;
