import React from 'react';
import Toolbar from './toolbar';
import {v4} from 'uuid';

import styles from '../../styles/toolbarItem';
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
    this.addPostIt = this.addPostIt.bind(this);
  }

  pasteNodes() {
    const {copiedNodes, addNode, updateNode} = this.props;
    copiedNodes &&
      copiedNodes.forEach((node) => {
        const nodeId = v4();
        const newNode = {
          ...node,
          id: nodeId,
          x: node.x + 20,
          y: node.y + 20,
          parameters: node.parameters.map((parameter) => ({
            ...parameter,
            id: v4(),
            input: parameter.input ? v4() : null,
            output: parameter.output ? v4() : null,
            node: nodeId,
          })),
        };
        addNode(newNode);
        updateNode(newNode.id);
      });
  }

  addPostIt() {
    const {addSticky} = this.props;
    addSticky({id: v4(), title: 'name', content: 'my memo'});
  }

  render() {
    const {
      copyItems,
      clearDatabase,
      deleteSelection,
      selection,
      zoomToFit,
      printCanvas,
    } = this.props;

    const menu = [
      {
        text: 'File',
        items: [
          {
            text: (
              <span>
                {' '}
                <i className="far fa-file" style={styles.icon} />
                New
              </span>
            ),
            callback: clearDatabase,
          },
          {
            text: (
              <span>
                {' '}
                <i className="far fa-save" style={styles.icon} />
                Save to SVG
              </span>
            ),
            callback: () => printCanvas('SVG'),
          },
          {
            text: (
              <span>
                {' '}
                <i className="far fa-save" style={styles.icon} />
                Save to PNG
              </span>
            ),
            callback: () => printCanvas('PNG'),
          },
          // {
          //   text: (
          //     <span>
          //       <FaRegFile /> Open
          //     </span>
          //   )
          //   // callback: this.open
          // }
        ],
      },
      {
        text: 'Edit',
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
            callback: () => copyItems(selection.nodes),
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
            callback: this.pasteNodes,
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
            callback: deleteSelection,
          },
        ],
      },
      {
        text: 'View',
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
            callback: zoomToFit,
          },
        ],
      },
      {
        text: 'Post-it',
        items: [
          {
            text: (
              <span>
                <i className="fas fa-sticky-note" style={styles.icon} />
                Add post-it
              </span>
            ),
            callback: this.addPostIt,
          },
        ],
      },
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
export default GiraffeToolbar;
