import { v4 } from "uuid";
import React from "react";
import Radium from "radium";
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
import CustomDragLayer from "../draggables/customDragLayer";
import { drop } from "../utils/dropNode";
import { loadPorkFile } from "../utils/loadPorkFile";
import styles from "../styles/content";

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

        const templateNode = item.category;
        const node = $.extend(true, {}, templateNode);

        const name = node.title.name;
        const code = node.title && node.title.code;
        node.parameters =
          node.ports &&
          node.ports.map(parameter => {
            // #TODO link to a proper default value
            return {
              ...parameter,
              node: node.id,
              id: v4(),
              value: parameter.value || parameter.default || "",
              input: parameter.input ? v4() : null,
              output: parameter.output ? v4() : null,
              isVisible: parameter.visible,
              isEditable: parameter.editable
            };
          });

        let transform = component.graphview.current.getViewTransform();
        const zoom = transform.k;

        const newNode = {
          id: v4(),
          name: name,
          // #TODO fix positioning of dropped node, issue #73
          x:
            (contentPosition.x -
              monitor.getInitialClientOffset().x -
              transform.x) /
            zoom,
          y: (contentPosition.y - transform.y) / zoom,
          width: name.length * 12,
          colour: node.colour,
          parameters: node.parameters,
          web_url: node.title.web_url || "",
          code: code || "",
          category: node.category
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
    this.deleteSelection = this.deleteSelection.bind(this);
    this.loadFromJson = this.loadFromJson.bind(this);
    this.setPercent = this.setPercent.bind(this);
  }

  deleteSelection() {
    const { selection, deleteNode, deleteLink } = this.props;
    selection &&
      selection.nodes &&
      selection.nodes.forEach(node => {
        deleteNode(node);
      });
    selection &&
      selection.links &&
      selection.links.forEach(link => {
        deleteLink(link);
      });
  }

  componentDidMount() {
    const { setPorkFile } = this.props;
    const { user, repository, branch, commit } = this.props.user;
    if (!user || !repository || (!branch && !commit)) {
      console.log("No username, repository, or branch provided");
      return;
    }

    const baseName = `https://raw.githubusercontent.com/${user}/${repository}/${branch ||
      commit}`;
    const configFile = `${baseName}/GIRAFFE.yml`;
    fetch(configFile)
      .then(response => response.ok && response.text())
      .then(text => {
        const configuration = loadYaml(text);
        const configFile = configuration.tools.porcupine.file[0];
        setPorkFile(configFile);
        const porcupineFile = `${baseName}/${configFile}`;

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
      })
      .catch(error => {
        console.log("Cannot load config file");
      });
  }

  setPercent(percent) {
    const { updateLoadingPercent } = this.props;
    if (percent >= 100) {
      updateLoadingPercent(99.9);
      // Always leave percent at -1
      this.timeout = setTimeout(() => {
        updateLoadingPercent(-1);
      }, 4000);
    } else {
      updateLoadingPercent(percent);
    }
  }

  loadFromJson(json) {
    const { addNode, addLink, clearDatabase, repositionPorts } = this.props;
    this.setPercent(10); // Loading started!
    clearDatabase();

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
    try {
      let i = 0;
      nodes.forEach(node => {
        addNode(node);
        repositionPorts(node);
        this.setPercent(50 + (30 * i++) / nodes.length);
      });
      i = 0;
      links.forEach(link => {
        addLink(link);
        this.setPercent(80 + (20 * i++) / links.length);
      });
    } catch (err) {
      this.setPercent(-1);
      console.log(
        "Error while adding Link or Node to Canvas, Check Porcupine Config file "
      );
    }
    this.setPercent(-1);
  }

  render() {
    const { connectDropTarget, nodes, links, loadingPercent } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={[styles.canvas]}>
          <ProgressBar
            percent={loadingPercent}
            onTop={true}
            spinner={"right"}
          />
          <GraphView
            ref={this.graphview}
            nodes={nodes}
            links={links}
            deleteSelection={this.deleteSelection}
          />
        </div>
      )
    );
  }
}
export default Radium(Canvas);
