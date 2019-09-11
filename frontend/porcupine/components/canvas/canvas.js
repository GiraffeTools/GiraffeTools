import {v4} from 'uuid';
import React from 'react';
import {DropTarget} from 'react-dnd';
import keydown from 'react-keydown';

import ItemTypes from '../../draggables/itemTypes';
import GraphView from './graphView';
import {camelToSnake} from '../../utils';
import GiraffeLoader from './giraffeLoader';
import defaultGenerators from '../../utils/codeGenerators';
import styles from '../../styles/canvas';
import {
  loadContent,
  loadCustomNodes,
  loadGrammars,
} from '../../utils/loadPorkFile';

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
    //   [left, top] = snapToGrid(left, top)
    // }

    switch (itemType) {
      case ItemTypes.NODE:
        x = Math.round(item.x + x);
        y = Math.round(item.y + y);
        props.updateNode(item.id, {x, y});
        break;
      case ItemTypes.PANE_ELEMENT:
        const contentPosition = monitor.getSourceClientOffset();
        const {addNode, updateNode} = props;
        const templateNode = item.category;
        const name = camelToSnake(templateNode.name);
        const className = templateNode.name;
        const code = templateNode.code;
        const parameters =
          templateNode.ports &&
          templateNode.ports.map((parameter) => ({
            ...parameter,
            id: v4(),
            node: templateNode.id,
            value: parameter.value || parameter.default || '',
            input: parameter.input ? v4() : null,
            output: parameter.output ? v4() : null,
            type: parameter.type,
            isVisible: parameter.visible,
            isEditable: parameter.editable,
          }));

        const transform = component.graphview.current.getViewTransform();
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
          colour: templateNode.colour || '#BBB',
          parameters,
          web_url: templateNode.web_url || '',
          code: code || '',
        };

        addNode(newNode);
        updateNode(newNode.id);

        break;
      default:
        return null;
    }

    return {name: 'Canvas'};
  },
};

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.graphview = React.createRef();
    this.test = React.createRef();
    this.load = this.load.bind(this);
    this.deleteSelection = this.deleteSelection.bind(this);
  }

  @keydown(['delete', 'backspace'])
  handleKeyPress(event) {
    switch (event.key) {
      case 'Delete':
        this.deleteSelection();
        break;
      case 'Backspace':
        this.deleteSelection();
        break;
      default:
        break;
    }
  }

  deleteSelection() {
    const {selection, deleteNode, deleteLink, deleteSticky} = this.props;
    selection &&
      selection.nodes &&
      selection.nodes.forEach((node) => {
        deleteNode(node);
      });
    selection &&
      selection.links &&
      selection.links.forEach((link) => {
        deleteLink(link);
      });
    selection &&
      selection.stickies &&
      selection.stickies.forEach((sticky) => {
        deleteSticky(sticky);
      });
  }

  async componentDidMount() {
    const {addGrammar} = this.props;
    const generators = defaultGenerators().map((generator) =>
      addGrammar({...generator})
    );
    Promise.all(generators);
  }

  // this is called via ref from content
  async load(configuration, repoContentUrl) {
    const {graphview} = this;

    const {file, files, nodes, grammars} = configuration;
    await Promise.all([
      loadContent(file || files, repoContentUrl),
      loadCustomNodes(nodes, repoContentUrl),
      loadGrammars(grammars, repoContentUrl),
    ]);
    graphview.current.handleZoomToFit();
  }

  render() {
    const {
      nodes,
      links,
      stickies,
      connectDropTarget,
      loadingPercent,
    } = this.props;
    return connectDropTarget(
        <div 
          style={styles.canvas}
        >
          <GiraffeLoader percent={loadingPercent} />
          <GraphView
            ref={this.graphview}
            nodes={nodes}
            links={links}
            stickies={stickies}
            deleteSelection={this.deleteSelection}
          />
        </div>
    );
  }
}
export default DropTarget(
    [ItemTypes.NODE, ItemTypes.PANE_ELEMENT],
    boxTarget,
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
)(Canvas);
