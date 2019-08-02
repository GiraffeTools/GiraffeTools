import {v4} from 'uuid';
import React from 'react';
import {DropTarget} from 'react-dnd';
import {load as loadYaml} from 'yaml-js';
import to from 'await-to-js';

import ItemTypes from '../../draggables/itemTypes';
import GraphView from './graphView';
import {camelToSnake} from '../../utils';
import GiraffeLoader from './giraffeLoader';
import {loadPorkFile} from '../../utils/loadPorkFile';
import defaultGenerators from '../../utils/codeGenerators';
import scriptToGenerator from '../../utils/dynamicImport';
import styles from '../../styles/canvas';

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
        break;
    }

    return {name: 'Canvas'};
  },
};

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.graphview = React.createRef();
    this.load = this.load.bind(this);
    this.deleteSelection = this.deleteSelection.bind(this);
    this.loadFromJson = this.loadFromJson.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    // This also responds when a backspace is pressed while updating parameters.
    // #TODO, make this conditional on the window being active
    switch (event.key) {
      case 'Delete':
        // this.deleteSelection();
        break;
      case 'Backspace':
        // this.deleteSelection();
        break;
      default:
        break;
    }
  }

  deleteSelection() {
    const {selection, deleteNode, deleteLink} = this.props;
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
  }

  async componentDidMount() {
    const {addGrammar} = this.props;
    const generators = defaultGenerators().map((generator) =>
      addGrammar({...generator})
    );
    Promise.all(generators);
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  // this is called via ref from content
  async load() {
    const {
      setPorkFile,
      project,
      addToolboxNodes,
      addGrammar,
      clickItem,
      updateLoadingPercent,
    } = this.props;
    const {user, repository, branch, commit} = project;
    if (!user || !repository || (!branch && !commit)) {
      console.log('No username, repository, or branch provided');
      return;
    }

    const baseName = `https://raw.githubusercontent.com/${user}/${repository}/${branch ||
      commit}`;
    const configFile = `${baseName}/GIRAFFE.yml`;

    const configuration = await fetch(configFile);
    if (!configuration.ok) {
      console.log('GiraffeTools configuration file cannot be loaded');
      return;
    }

    const {loadFromJson, graphview} = this;
    async function loadContent(porkfiles) {
      if (!porkfiles || !porkfiles.length) return;

      // currently, take first
      const file = porkfiles[0];
      setPorkFile(file);
      const porkData = await fetch(`${baseName}/${file}`);
      if (!porkData.ok) {
        console.log('Pork file cannot be loaded');
      }
      const content = await porkData.json();
      try {
        await loadFromJson(content);
        clickItem(null);
        graphview.current.handleZoomToFit();
      } catch (error) {
        console.log('Cannot load Porcupine Config file:');
        console.log(error);
        updateLoadingPercent(-1);
      }
    }
    const loadCustomNodes = (nodeFiles) => {
      if (!nodeFiles || !nodeFiles.length) return;
      nodeFiles.forEach(async (nodeFile) => {
        // does file start with http(s)?
        const url = /^(f|ht)tps?:\/\//i.test(nodeFile)
          ? nodeFile
          : `${baseName}/${nodeFile}`;
        const nodes = await (await fetch(url)).json();
        addToolboxNodes(nodes.toolboxes);
      });
    };

    const loadGrammars = (grammars) => {
      if (!grammars || !grammars.length) return;

      grammars.forEach(async (grammar) => {
        const {script, language, format} = grammar;
        // does file start with http(s)?
        const url = /^(f|ht)tps?:\/\//i.test(script)
          ? script
          : `${baseName}/${script}`;
        const generatorFunctions = await scriptToGenerator(
            url,
            grammar.language
        );
        addGrammar({
          ...generatorFunctions,
          language,
          format,
        });
      });
    };

    const yamlData = loadYaml(await configuration.text());
    if (!yamlData || !yamlData.tools || !yamlData.tools.porcupine) return;

    const {file, files, nodes, grammars} = yamlData.tools.porcupine;
    Promise.all([
      loadContent(file || files),
      loadCustomNodes(nodes),
      loadGrammars(grammars),
    ]);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  async loadFromJson(json) {
    const {
      addNode,
      addLink,
      addSticky,
      clearDatabase,
      updateNode,
      updateLoadingPercent,
    } = this.props;
    updateLoadingPercent(10); // Loading started!
    clearDatabase();

    const [error, response] = await to(
        loadPorkFile(json, updateLoadingPercent)
    );
    if (error) {
      console.log(
          'Error reading Porcupine Config file!' +
          'Either data is missing or format is incorrect'
      );
      return;
    }
    updateLoadingPercent(50); // Loading finished!

    const {nodes, links, stickies} = response;
    try {
      let i = 0;
      nodes.forEach((node) => {
        addNode(node);
        updateNode(node.id);
        updateLoadingPercent(50 + (30 * i++) / nodes.length);
      });
      updateLoadingPercent(80); // Nodes loaded!
      i = 0;
      links.forEach((link) => {
        addLink(link);
        updateLoadingPercent(80 + (10 * i++) / links.length);
      });
      stickies.forEach((sticky) => {
        addSticky(sticky);
        updateLoadingPercent(90 + (10 * i++) / links.length);
      });
    } catch (error) {
      updateLoadingPercent(-1);
      console.log(
          'Error while adding Link or Node to Canvas, ' +
          'Check Porcupine Config file.'
      );
      console.log(error);
      return;
    }
    updateLoadingPercent(-1);
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
        <div style={styles.canvas}>
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
