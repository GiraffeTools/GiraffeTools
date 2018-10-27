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
import { load as loadYaml } from "yaml-js";
import "react-progress-bar-plus/lib/progress-bar.css";

import ItemTypes from "./itemTypes";
import GraphView from "./graphView";
import Links from "./links";
import Nodes from "./nodes";
import ZoomIn from "./zoomIn";
import ZoomOut from "./zoomOut";
import CustomDragLayer from "../draggables/customDragLayer";
import { drop } from "../utils/dropNode";
import { loadPorkFile } from "../utils/loadPorkFile";

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
        const code = node.title && node.title.code;
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
    this.graphview = React.createRef();
    this.clickCanvas = this.clickCanvas.bind(this);
    this.loadFromJson = this.loadFromJson.bind(this);
    this.setPercent = this.setPercent.bind(this);
  }

  componentDidMount() {
    const { user, repository, branch } = this.props.user;
    if (!user || !repository || !branch) {
      console.log("No username, repository, or branch provided");
      return;
    }

    const baseName = `https://raw.githubusercontent.com/${user}/${repository}/${branch}`;
    const configFile = `${baseName}/GIRAFFE.yml`;
    fetch(configFile)
      .then(result => result.body.getReader())
      .then(reader => {
        reader.read().then(({ done, value }) => {
          const configuration = loadYaml(
            new TextDecoder("utf-8").decode(value)
          );
          const porcupineFile = `${baseName}/${
            configuration.tools.porcupine.file[0]
          }`;

          fetch(porcupineFile)
            .then(result => result.json())
            .then(data => {
              this.loadFromJson(data);
              this.graphview.current.handleZoomToFit();
              console.log("Porcupine Config file loaded from URL");
            })
            .catch(error => {
              console.log("Cannot load Porcupine Config file");
              this.setPercent(-1);
            });
        });
      })
      .catch();
  }

  setPercent(percent) {
    const { updateLoadingPercent } = this.props;
    if (percent >= 100) {
      updateLoadingPercent(99.9);
      // Always leave percent at -1
      this.timeout = setTimeout(() => {
        updateLoadingPercent(-1);
      }, 400);
    } else {
      updateLoadingPercent(percent);
    }
  }

  loadFromJson(json) {
    this.setPercent(10); // Loading started!
    const { addNode, addLink, clearDatabase, repositionPorts } = this.props;
    //pass by reference and fill them in the load functions
    let nodes = [];
    let links = [];
    try {
      loadPorkFile(json, nodes, links, this.setPercent);
    } catch (err) {
      console.log(
        "Error reading Porcupine Config file! Either data is missing or format is incorrect"
      );
      this.setPercent(-1);
    }
    clearDatabase();
    try {
      nodes.forEach(node => {
        addNode(node);
        repositionPorts(node);
      });
      links.forEach(link => {
        addLink(link);
      });
    } catch (err) {
      console.log(
        "Error while adding Link or Node to Canvas, Check Porcupine Config file "
      );
    }
  }

  clickCanvas(event) {
    const { clickScene } = this.props;
    clickScene();
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    const { connectDropTarget, nodes, links, loadingPercent } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className="canvas" onClick={this.clickCanvas}>
          <ProgressBar
            percent={loadingPercent}
            onTop={true}
            spinner={"right"}
          />
          <GraphView ref={this.graphview} nodes={nodes} links={links} />
        </div>
      )
    );
  }
}
export default Canvas;
