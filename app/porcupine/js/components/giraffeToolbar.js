import React from "react";
import Radium from "radium";
import Toolbar from "./toolbar";
import { v4 } from "uuid";

import styles from "../styles/toolbarItem";
// import {
//   FaExpand,
//   FaTrashAlt,
//   FaCopy,
//   FaCut,
//   FaPaste,
//   FaSave,
// FaRegFile,
//   FaUndo,
//   FaRedo,
//   FaRegFile
// } from "react-icons/fa";
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
                <i className="far fa-file" style={styles.icon} />
                New
              </span>
            ),
            callback: clearDatabase
          }
          // {
          //   text: (
          //     <span>
          //       <FaRegFile /> Open
          //     </span>
          //   )
          //   // callback: this.open
          // }
        ]
      },
      {
        text: "Edit",
        items: [
          //     {
          //       text: (
          //         <span>
          //           <FaUndo /> Undo
          //         </span>
          //       )
          //       // callback: this.undo
          //     },
          //     {
          //       text: (
          //         <span>
          //           <FaRedo /> Redo
          //         </span>
          //       )
          //       // callback: this.redo
          //     },
          {
            text: (
              <span>
                <i className="far fa-copy" style={styles.icon} />
                Copy
              </span>
            ),
            // text: (
            //   <span>
            //     <FaCopy /> Copy
            //   </span>
            // )
            callback: () => copyItems(selection.nodes)
          },
          {
            text: (
              <span>
                <i className="fas fa-paste" style={styles.icon} />
                Paste
              </span>
            ),
            // text: (
            //   <span>
            //     <FaPaste /> Paste
            //   </span>
            // )
            callback: this.pasteNodes
          },
          {
            text: (
              <span>
                <i className="far fa-trash-alt" style={styles.icon} />
                Delete
              </span>
            ),
            // text: (
            //   <span>
            //     <FaTrashAlt /> Delete
            //   </span>
            // )
            callback: deleteSelection
          }
        ]
      },
      {
        text: "View",
        items: [
          {
            text: (
              <span>
                <i className="fas fa-expand" style={styles.icon} />
                Zoom to fit
              </span>
            ),
            // text: (
            //   <span>
            //     <FaExpand />
            //   </span>
            // ),
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
