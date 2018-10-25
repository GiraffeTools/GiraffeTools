import React from "react";
import * as d3 from 'd3';

import CustomDragLayer from "../draggables/customDragLayer";
import GraphControls from "./graphControls";
import Links from "./links";
import Nodes from "./nodes";
import SVG from 'react-inlinesvg';

const defaults = {
  minZoom: 0.15,
  maxZoom: 1.50,
  gridSpacing: 36,
  gridDot: 2,
  gridSize: 40960,
  zoomDuration: 750,
}

const Background = () => (
  <rect
    className='background'
    x={ -defaults.gridSize / 4 }
    y={ -defaults.gridSize / 4 }
    width={ defaults.gridSize }
    height={ defaults.gridSize }
    fill="url(#grid)"
  />
)

class GraphView extends React.Component {

  constructor(props) {
    super(props);
    this.renderDefs = this.renderDefs.bind();

    this.state = {
      viewTransform: d3.zoomIdentity,
    };

    this.zoom = d3
      .zoom()
      .scaleExtent([defaults.minZoom, defaults.maxZoom])
      .on("zoom", this.handleZoom);
  }

  componentDidMount() {
    d3.select(this.viewWrapper)
      .on('keydown', this.handleWrapperKeydown);
      // .on("touchstart", this.containZoom)
      // .on("touchmove", this.containZoom)
      // .on("click", this.handleSvgClicked)
    d3.select(this.viewWrapper)
      .select("svg")
      .call(this.zoom);
  }


  // Keeps 'zoom' contained
  containZoom = () => {
    d3.event.preventDefault();
  }
  // View 'zoom' handler
  handleZoom = () => {
    this.setState({
      viewTransform: d3.event.transform
    });
  }

  // Zooms to contents of this.refs.entities
  handleZoomToFit = () => {
    const parent = d3.select(this.viewWrapper).node();
    const entities = d3.select(this.entities).node();

    const viewBBox = entities.getBBox();

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    let translate = [this.state.viewTransform.x, this.state.viewTransform.y],
        next = { x: translate[0], y: translate[1], k: this.state.viewTransform.k };

    if (viewBBox.width > 0 && viewBBox.height > 0){
      // There are entities
      let dx = viewBBox.width,
          dy = viewBBox.height,
          x = viewBBox.x + viewBBox.width / 2,
          y = viewBBox.y + viewBBox.height / 2;

      next.k = .9 / Math.max(dx / width, dy / height);

      if (next.k < this.props.minZoom){
        next.k = this.props.minZoom;
      } else if (next.k > this.props.maxZoom){
        next.k = this.props.maxZoom;
      }

      next.x = width / 2 - next.k * x;
      next.y = height / 2 - next.k * y;
    }
    else{
      next.k = (this.props.minZoom + this.props.maxZoom) / 2;
      next.x = 0;
      next.y = 0;
    }

    this.setZoom(next.k, next.x, next.y, defaults.zoomDuration);
  }

  // Updates current viewTransform with some delta
  modifyZoom = (modK = 0, modX = 0, modY = 0, dur = 0) => {
    const parent = d3.select(this.viewWrapper).node();
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    let center = [width/2, height/2],
        extent = this.zoom.scaleExtent(),
        translate = [this.state.viewTransform.x, this.state.viewTransform.y],
        next = {x: translate[0], y: translate[1], k:  this.state.viewTransform.k};

    const target_zoom = next.k * (1 + modK);
    if (target_zoom < extent[0] || target_zoom > extent[1]) {
      return false;
    }

    const translate0 = [(center[0] - next.x) / next.k, (center[1] - next.y) / next.k];
    next.k = target_zoom;

    const l = [translate0[0] * next.k + next.x, translate0[1] * next.k + next.y];
    next.x += center[0] - l[0] + modX;
    next.y += center[1] - l[1] + modY;
    this.setZoom(next.k, next.x, next.y, dur)
  }

  // Programmatically resets zoom
  setZoom = (k = 1, x = 0, y = 0, dur = 0) => {
    var t = d3.zoomIdentity.translate(x, y).scale(k);
    d3.select(this.viewWrapper).select('svg')
      .transition()
      .duration(dur)
      .call(this.zoom.transform, t);
  }

  handleWrapperKeydown = () => {
    // Conditionally ignore keypress events on the window
    // if the Graph isn't focused
    switch (d3.event.key) {
      case "Delete":
        console.log("Delete");
        // this.handleDelete();
        break;
      case "Backspace":
        console.log("Backspace");
        // this.handleDelete();
        break;
      default:
        break;
    }
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
      </defs>
    )
  }

  render() {
    const { nodes, links } = this.props;
    const view = d3.select(this.view);
    const viewNode = view.node();
    if (viewNode) {
      const { k, x, y } = this.state.viewTransform;
      view.attr("transform", this.state.viewTransform);
    }

    return (
      <div
        className='viewWrapper'
        ref={(el) => this.viewWrapper = el}
      >
        <svg
          height="100%"
          width="100%"
        >
          { this.renderDefs() }
          <g
            className='view'
            ref={(el) => this.view = el}
          >
            <Background />
            <g
             className='entities'
             ref={(el) => this.entities = el}
            >
              <Nodes nodes={nodes} />
              <Links links={links} />
              <CustomDragLayer />
            </g>
          </g>
        </svg>
        <GraphControls
          minZoom={defaults.minZoom}
          maxZoom={defaults.maxZoom}
          zoomLevel={this.state.viewTransform.k}
          zoomToFit={this.handleZoomToFit}
          modifyZoom={this.modifyZoom}
        />
      </div>
    )
  }
}


export default GraphView;
