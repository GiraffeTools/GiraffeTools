import { v4 } from "uuid";
import PropTypes from "prop-types";
import React from "react";
import { PinchView } from "react-pinch-zoom-pan";
import { DropTarget } from "react-dnd";
import $ from "jquery";

import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/lib/progress-bar.css";

import ItemTypes from "./itemTypes";
import Links from "./links";
import Nodes from "./nodes";

const ZoomIn = () => {
  return (
    <div id="icon-plus" className="canvas-icon">
      <p>Press</p>
      <button className="btn btn-default text-center">
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
};

const ZoomOut = () => {
  return (
    <div id="icon-minus" className="canvas-icon">
      <p>Press</p>
      <button className="btn btn-default text-center">
        <span aria-hidden="true">-</span>
      </button>
    </div>
  );
};

const boxTarget = {
  drop(props, monitor, component) {
    component.drop(monitor.getItem(), monitor.getClientOffset());
    return { name: "Canvas" };
  }
};

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.clickCanvas = this.clickCanvas.bind(this);
  }

  componentDidMount() {
    // #TODO remove/replace zoomFunctions in issue #73
    // setBoundingBox();
    // this.mouseState = zoomFunctions();
  }

  componentDidUpdate() {
    this.placeholder = false;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(item, offset) {
    const { addNode, addPortToNode, repositionPorts } = this.props;

    this.placeholder = false;
    const rec = document.getElementById("main").getBoundingClientRect();
    // #TODO to be updated as part of #73:
    // const canvas = document.getElementById('jsplumbContainer');
    // const zoom = instance.getZoom();
    const zoom = 1;

    const templateNode = item.element_type;
    const node = $.extend(true, {}, templateNode);

    const name = node.title.name;
    node.ports ? node.ports : {};
    node.ports = node.ports.map(port => {
      // #TODO link to a proper default value
      return {
        ...port,
        id: v4(),
        value: port.value || port.default || ""
      };
    });

    const newNode = {
      id: v4(),
      name: name,
      // #TODO fix positioning of dropped node, issue #73
      x: (offset.x - rec.left) / zoom - 45,
      y: (offset.y - rec.top) / zoom - 25,
      width: name.length * 12,
      colour: node.colour,
      ports: node.ports,
      web_url: node.title.web_url || ""
    };

    addNode(newNode);
    repositionPorts(newNode);
  }

  clickCanvas(event) {
    const { clickScene } = this.props;
    clickScene();
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    const { canDrop, isOver, connectDropTarget, nodes, links } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = "#222";
    if (isActive) {
      backgroundColor = "darkgreen";
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    return connectDropTarget(
      <div
        className="canvas"
        onDragOver={this.allowDrop}
        onClick={this.clickCanvas}
      >
        <ProgressBar
          percent={this.props.loadingPercent}
          onTop={true}
          spinner={"right"}
        />
        {/* {errors} */}
        {nodes.length == 0 ? (
          <h4 className="text-center" id="placeholder">
            Drag your nodes here!
          </h4>
        ) : (
          ""
        )}
        {/* #TODO replace this container, issue #73 */}

        <PinchView>
          <div id="mainSurface">
            <Nodes nodes={nodes} />
            <Links links={links} />
          </div>
        </PinchView>

        <ZoomIn />
        <ZoomOut />
      </div>
    );
  }
}

Canvas.propTypes = {
  // connectDropTarget:    PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default (Canvas = DropTarget(
  ItemTypes.PaneElement,
  boxTarget,
  (connection, monitor) => ({
    connectDropTarget: connection.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(Canvas));
