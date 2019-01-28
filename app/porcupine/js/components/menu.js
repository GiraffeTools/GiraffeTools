import { v4 } from "uuid";
import React from "react";
import Radium from "radium";

import MenuGoo from "./menuGoo";
import MenuSlider from "./menuSlider";
import {
  FaExpand,
  FaTrashAlt,
  FaCopy,
  FaCut,
  FaPaste,
  FaSave,
  FaRegFile
} from "react-icons/fa";
import styles from "../styles/menu";

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.pasteNodes = this.pasteNodes.bind(this);
  }

  pasteNodes() {
    const { copiedNodes, addNode, updateNode } = this.props;
    copiedNodes &&
      copiedNodes.forEach(node => {
        const nodeId = v4();
        const newNode = {
          ...node,
          id: nodeId,
          x: node.x + 20,
          y: node.y + 20,
          parameters: node.parameters.map(parameter => ({
            ...parameter,
            id: v4(),
            input: parameter.input ? v4() : null,
            output: parameter.output ? v4() : null,
            node: nodeId
          }))
        };
        addNode(newNode);
        updateNode(newNode.id);
      });
  }

  render() {
    const {
      copyItems,
      copyNodes,
      clearDatabase,
      deleteSelection,
      minZoom,
      maxZoom,
      modifyZoom,
      selection,
      zoomLevel,
      zoomToFit
    } = this.props;
    return (
      <div>
        <nav style={[styles.nav]}>
          <MenuSlider
            minZoom={minZoom}
            maxZoom={maxZoom}
            modifyZoom={modifyZoom}
            zoomLevel={zoomLevel}
          />
          <div className="menu" style={[styles.menu]}>
            <input
              type="checkbox"
              href="#"
              className="menu-open"
              name="menu-open"
              id="menu-open"
            />
            <label className="menu-open-button" htmlFor="menu-open">
              <span className="hamburger hamburger-1" />
              <span className="hamburger hamburger-2" />
              <span className="hamburger hamburger-3" />
            </label>

            <a
              style={[styles.menuItem]}
              className="menu-item"
              onClick={zoomToFit}
            >
              <FaExpand />
            </a>
            <a
              style={[styles.menuItem]}
              className="menu-item"
              onClick={deleteSelection}
            >
              <FaTrashAlt />
            </a>
            <a
              style={[styles.menuItem]}
              className="menu-item"
              onClick={() => copyItems(selection.nodes)}
            >
              <FaCopy />
            </a>
            {/*<a style={[styles.menuItem]} className="menu-item" onClick={() => {}}> <FaCut /> </a>*/}
            <a
              style={[styles.menuItem]}
              className="menu-item"
              onClick={this.pasteNodes}
            >
              <FaPaste />
            </a>
            <a
              style={[styles.menuItem]}
              className="menu-item"
              onClick={clearDatabase}
            >
              <FaRegFile />
            </a>

            <MenuGoo />
          </div>
        </nav>
      </div>
    );
  }
}
export default Radium(Menu);
