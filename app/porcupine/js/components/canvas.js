import { v4 } from "uuid";
import React from "react";
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector
} from "react-dnd";
import $ from "jquery";
import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/lib/progress-bar.css";

import ItemTypes from "./itemTypes";
import GraphView from "./graphView";
import Links from "./links";
import Nodes from "./nodes";
import ZoomIn from "./zoomIn";
import ZoomOut from "./zoomOut";
import CustomDragLayer from "../draggables/customDragLayer";
import { drop } from "../utils/dropNode";

const boxTarget = {
  drop(props, monitor, component) {
    if (!component) {
      return;
    }
    const delta = monitor.getDifferenceFromInitialOffset();
    const itemType = monitor.getItemType();
    const item = monitor.getItem();

    let x = delta.x;
    let y = delta.y;

    // if (props.snapToGrid) {
    // 	;[left, top] = snapToGrid(left, top)
    // }

    switch (itemType) {
      case ItemTypes.NODE:
        x = Math.round(item.x + x);
        y = Math.round(item.y + y);
        props.updateNodePosition(item.id, { x, y });
        //HACK: passing on all props is dirty
        props.repositionPorts({ ...item, x, y });
        break;
      case ItemTypes.PANE_ELEMENT:
        const contentPosition = monitor.getSourceClientOffset();
        const { addNode, repositionPorts } = props;
        const zoom = 1;

        const templateNode = item.category;
        const node = $.extend(true, {}, templateNode);

        const name = node.title.name;
        const code = node.title.code;
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
          x: (contentPosition.x - monitor.getInitialClientOffset().x) / zoom,
          y: contentPosition.y / zoom,
          width: name.length * 12,
          colour: node.colour,
          ports: node.ports,
          web_url: node.title.web_url || "",
          code: code || ""
        };

        addNode(newNode);
        repositionPorts(newNode);
        break;
      default:
        return null;
        break;
    }

    return { name: "Canvas" };
  }
};

@DropTarget([ItemTypes.NODE, ItemTypes.PANE_ELEMENT], boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickCanvas = this.clickCanvas.bind(this);
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

    return (
      connectDropTarget &&
      connectDropTarget(
        <div className="canvas" onClick={this.clickCanvas}>
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

          {/*
          <div id="mainSurface">
            <Nodes nodes={nodes} />
            <Links links={links} />
            <CustomDragLayer />
          </div>
          */}

          <div
            id='graph'
            // style={styles.graph}
          >
            <GraphView
              ref={(el) => this.GraphView = el}
              // nodeKey={NODE_KEY}
              // emptyType={EMPTY_TYPE}
              nodes={nodes}
              links={links}
              // edges={edges}
              // selected={selected}
              // nodeTypes={NodeTypes}
              // nodeSubtypes={NodeSubtypes}
              // edgeTypes={EdgeTypes}
              enableFocus={true}
              getViewNode={this.getViewNode}
              onSelectNode={this.onSelectNode}
              onCreateNode={this.onCreateNode}
              onUpdateNode={this.onUpdateNode}
              onDeleteNode={this.onDeleteNode}
              onSelectEdge={this.onSelectEdge}
              onCreateEdge={this.onCreateEdge}
              onSwapEdge={this.onSwapEdge}
              onDeleteEdge={this.onDeleteEdge}/>
          </div>
          <div className ="row" id="zoom-icons">
            <ZoomIn />
            <ZoomOut />
          </div>
        </div>
      )
    );
  }
}
export default Canvas;
