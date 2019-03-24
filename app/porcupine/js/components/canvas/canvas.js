import { v4 } from "uuid";
import React from "react";
import Radium from "radium";
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector
} from "react-dnd";
import ProgressBar from "react-progress-bar-plus";
import { load as loadYaml } from "yaml-js";
import "react-progress-bar-plus/lib/progress-bar.css";
import to from "await-to-js";

import ItemTypes from "../../draggables/itemTypes";
import CustomDragLayer from "../../draggables/customDragLayer";
import GraphView from "./graphView";
import { drop } from "../../utils/dropNode";
import { loadPorkFile } from "../../utils/loadPorkFile";
import styles from "../../styles/canvas";

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
        props.updateNode(item.id, { x, y });
        break;
      case ItemTypes.PANE_ELEMENT:
        const contentPosition = monitor.getSourceClientOffset();
        const { addNode, updateNode } = props;
        const templateNode = item.category;
        const name = templateNode.name.replace(".", "_");
        const className = templateNode.name;
        const code = templateNode.code;
        const parameters =
          templateNode.ports &&
          templateNode.ports.map(parameter => ({
            ...parameter,
            id: v4(),
            node: templateNode.id,
            value: parameter.value || parameter.default || "",
            input: parameter.input ? v4() : null,
            output: parameter.output ? v4() : null,
            isVisible: parameter.visible,
            isEditable: parameter.editable
          }));

        let transform = component.graphview.current.getViewTransform();
        const zoom = transform.k;

        const newNode = {
          id: v4(),
          name,
          class: className,
          // #TODO fix positioning of dropped node, issue #73
          x:
            (contentPosition.x -
              monitor.getInitialClientOffset().x -
              transform.x) /
            zoom,
          y: (contentPosition.y - transform.y) / zoom,
          colour: templateNode.colour,
          parameters,
          web_url: templateNode.web_url || "",
          code: code || "",
          category: templateNode.category
        };

        addNode(newNode);
        updateNode(newNode.id);
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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    // This also responds when a backspace is pressed while updating parameters.
    // #TODO, make this conditional on the window being active
    switch (event.key) {
      case "Delete":
        // this.deleteSelection();
        break;
      case "Backspace":
        // this.deleteSelection();
        break;
      default:
        break;
    }
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

  async componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    const { setPorkFile, project, addToolboxNodes } = this.props;
    const { user, repository, branch, commit } = project;
    if (!user || !repository || (!branch && !commit)) {
      console.log("No username, repository, or branch provided");
      return;
    }

    const baseName = `https://raw.githubusercontent.com/${user}/${repository}/${branch ||
      commit}`;
    const configFile = `${baseName}/GIRAFFE.yml`;

    const configuration = await fetch(configFile);
    if (!configuration.ok) {
      console.log("GiraffeTools configuration file cannot be loaded");
      return;
    }

    const { setPercent, loadFromJson, graphview } = this;
    async function loadContent(porkfiles) {
      if (!porkfiles || !porkfiles.length) return;

      // currently, tkae first
      const file = porkfiles[0];
      setPorkFile(file);
      const porkData = await fetch(`${baseName}/${file}`);
      if (!porkData.ok) {
        console.log("Pork file cannot be loaded");
      }
      const content = await porkData.json();
      try {
        await loadFromJson(content);
        graphview.current.handleZoomToFit();
      } catch (error) {
        console.log("Cannot load Porcupine Config file:");
        console.log(error);
        setPercent(-1);
      }
    }
    async function loadCustomNodes(nodeFiles) {
      if (!nodeFiles || !nodeFiles.length) return;
      const nodes = await (await fetch(`${baseName}/${nodeFiles[0]}`)).json();
      addToolboxNodes(nodes.toolboxes);
    }

    const yamlData = loadYaml(await configuration.text());
    if (!yamlData || !yamlData.tools || !yamlData.tools.porcupine) return;

    const { file, files, nodes } = yamlData.tools.porcupine;
    Promise.all([loadContent(file || files), loadCustomNodes(nodes)]);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
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

  async loadFromJson(json) {
    const { addNode, addLink, clearDatabase, updateNode } = this.props;
    this.setPercent(10); // Loading started!
    clearDatabase();

    const [error, response] = await to(loadPorkFile(json, this.setPercent));
    if (error) {
      console.log(
        "Error reading Porcupine Config file! Either data is missing or format is incorrect"
      );
      return;
    } else {
      this.setPercent(-1);
    }
    const { nodes, links } = response;
    try {
      let i = 0;
      nodes.forEach(node => {
        addNode(node);
        updateNode(node.id);
        this.setPercent(50 + (30 * i++) / nodes.length);
      });
      i = 0;
      links.forEach(link => {
        addLink(link);
        this.setPercent(80 + (20 * i++) / links.length);
      });
    } catch (error) {
      this.setPercent(-1);
      console.log(
        "Error while adding Link or Node to Canvas, Check Porcupine Config file "
      );
      console.log(error);
      return;
    }
    this.setPercent(-1);
  }

  render() {
    const { connectDropTarget, nodes, links, loadingPercent } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div
          // because of the DropTarget, this is not a radium class at the moment
          // There are no []s around styles.canvas.
          // #TODO see if can be done cleanly
          style={styles.canvas}
        >
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
export default Canvas;
