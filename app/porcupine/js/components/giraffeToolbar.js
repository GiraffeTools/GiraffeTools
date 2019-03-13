import React from "react";
import Radium from "radium";
import Toolbar from "./toolbar";
import { v4 } from "uuid";

import {
  FaExpand,
  FaTrashAlt,
  FaCopy,
  FaCut,
  FaPaste,
  FaSave,
  FaRegFolderOpen,
  FaUndo,
  FaRedo,
  FaRegFile
} from "react-icons/fa";
class GiraffeToolbar extends React.Component {
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
      modifyZoom,
      selection,
      zoomToFit
    } = this.props;
    var menu = [
      {
        text: "File",
        items: [
          {
            text: (
              <span>
                {" "}
                <FaRegFile /> New{" "}
              </span>
            ),
            callback: clearDatabase
          },
          {
            text: (
              <span>
                {" "}
                <FaRegFolderOpen /> Open{" "}
              </span>
            )
            // callback: this.open
          }
        ]
      },
      {
        text: "Edit",
        items: [
          {
            text: (
              <span>
                {" "}
                <FaUndo /> Undo{" "}
              </span>
            )
            // callback: this.undo
          },
          {
            text: (
              <span>
                {" "}
                <FaRedo /> Redo{" "}
              </span>
            )
            // callback: this.redo
          },
          {
            text: (
              <span>
                {" "}
                <FaTrashAlt /> Delete{" "}
              </span>
            ),
            callback: deleteSelection
          },
          {
            text: (
              <span>
                {" "}
                <FaCopy /> Copy{" "}
              </span>
            ),
            callback: () => copyItems(selection.nodes)
          },
          {
            text: (
              <span>
                {" "}
                <FaPaste /> Paste{" "}
              </span>
            ),
            callback: this.pasteNodes
          }
        ]
      },
      {
        text: "View",
        items: [
          {
            text: (
              <span>
                {" "}
                <FaExpand /> Zoom to fit{" "}
              </span>
            ),
            callback: zoomToFit
          }
        ]
      }
    ];
    return (
      <Toolbar
        menu={menu}
        // logo={logo}
        // brand="React-Minimalist-Toolbar"
      />
    );
  }
}

export default Radium(GiraffeToolbar);
