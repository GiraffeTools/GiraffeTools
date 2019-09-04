import {v4} from 'uuid';
import {isUUID} from '../utils';
import {load as loadYaml} from 'yaml-js';
import to from 'await-to-js';
import store from '../store';
import {
  addNode,
  addLink,
  addSticky,
  clearDatabase,
  updateNode,
  updateLoadingPercent,
  addToolboxNodes,
  addGrammar,
  clickItem,
  setVisibleToolboxes,
} from '../actions';
import scriptToGenerator from './dynamicImport';


export async function loadGiraffeConfig(repoContentUrl) {
  const configFile = `${repoContentUrl}/GIRAFFE.yml`;
  const configuration = await fetch(configFile);
  if (!configuration.ok) {
    console.log('GiraffeTools configuration file cannot be loaded');
    return;
  }
  return loadYaml(await configuration.text());
}

async function loadFromJson(json) {
  store.dispatch(updateLoadingPercent(10)); // Loading started!
  store.dispatch(clearDatabase());

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
  store.dispatch(updateLoadingPercent(50)); // Loading finished!

  const {nodes, links, stickies, ui} = response;
  try {
    let i = 0;
    nodes.forEach((node) => {
      store.dispatch(addNode(node));
      store.dispatch(updateNode(node.id));
      store.dispatch(updateLoadingPercent(50 + (30 * i++) / nodes.length));
    });
    store.dispatch(updateLoadingPercent(80)); // Nodes loaded!
    i = 0;
    links.forEach((link) => {
      store.dispatch(addLink(link));
      store.dispatch(updateLoadingPercent(80 + (10 * i++) / links.length));
    });
    stickies.forEach((sticky) => {
      store.dispatch(addSticky(sticky));
      store.dispatch(updateLoadingPercent(90 + (10 * i++) / links.length));
    });
    if (ui) {
      const {showToolboxes} = ui;
      store.dispatch(setVisibleToolboxes(showToolboxes));
    }
  } catch (error) {
    store.dispatch(updateLoadingPercent(-1));
    console.log(
        'Error while adding Link or Node to Canvas, ' +
        'Check Porcupine Config file.'
    );
    console.log(error);
    return;
  }
  store.dispatch(updateLoadingPercent(-1));
}

export async function loadContent(porkfiles, repoContentUrl) {
  if (!porkfiles || !porkfiles.length) return;

  // currently, take first
  const file = porkfiles[0];
  const porkData = await fetch(`${repoContentUrl}/${file}`);
  if (!porkData.ok) {
    console.log('Pork file cannot be loaded');
  }
  const content = await porkData.json();
  try {
    await loadFromJson(content);
    store.dispatch(clickItem(null));
  } catch (error) {
    console.log('Cannot load Porcupine Config file:');
    console.log(error);
    store.dispatch(updateLoadingPercent(-1));
  }
}

export async function loadCustomNodes(nodeFiles, repoContentUrl) {
  if (!nodeFiles || !nodeFiles.length) return;
  nodeFiles.forEach(async (nodeFile) => {
    // does file start with http(s)?
    const url = /^(f|ht)tps?:\/\//i.test(nodeFile)
      ? nodeFile
      : `${repoContentUrl}/${nodeFile}`;
    const nodes = await (await fetch(url)).json();
    store.dispatch(addToolboxNodes(nodes.toolboxes));
  });
};

export async function loadGrammars(grammars, repoContentUrl) {
  if (!grammars || !grammars.length) return;

  grammars.forEach(async (grammar) => {
    const {script, language, format} = grammar;
    if (!script || !language) {
      console.log('Cannot load this grammar: incorrect format');
      return;
    }
    // does file start with http(s)?
    const url = /^(f|ht)tps?:\/\//i.test(script)
      ? script
      : `${repoContentUrl}/${script}`;
    const generatorFunctions = await scriptToGenerator(
        url,
        grammar.language
    );
    store.dispatch(
        addGrammar({
          ...generatorFunctions,
          language,
          format,
        })
    );
  });
};


export async function loadPorkFile(json, setPercent) {
  switch (json.version) {
    case '1':
      return await loadingVersion1(json, setPercent);
    case '2':
      // leaving room for future implementations
      break;
    default:
      return await loadingVersion1(json, setPercent);
  }
}

async function loadingVersion1(json, setPercent) {
  const {nodes, links, stickies, ui} = json;
  const nodeData = [];
  const linkData = [];
  const stickyData = [];

  // load nodes
  setPercent(20);
  nodes &&
    nodes.forEach((node) => {
      const newNode = {
        id: node.id || v4(),
        name:
          (node.title && node.title.name.replace('.', '_')) ||
          (node.name && node.name.replace('.', '_')) ||
          '',
        class:
          (node.title && (node.title.class || node.title.name)) ||
          node.class ||
          node.name,
        x: node.position[0],
        y: node.position[1],
        colour: node.colour || '#BBB',
        web_url: (node.title && node.title.web_url) || node.web_url || '',
        code: (node.title && node.title.code) || node.code,
      };

      newNode.parameters = node.ports.map((parameter) => ({
        node: newNode.id,
        id: isUUID(parameter.id) ? parameter.id : v4(),
        code: parameter.code,
        name: parameter.name,
        type: parameter.type,
        input: parameter.input ? parameter.inputPort : null,
        output: parameter.output ? parameter.outputPort : null,
        isVisible: parameter.visible || false,
        isEditable: parameter.editable || false,
        isIterable: parameter.iterator || false,
        value: parameter.value || '', // TODO insert proper default value
      }));

      nodeData.push(newNode);
      // setPercent(10 + (20 * nodeData.length) / nodes.length);
    });
  // load links
  links &&
    links.forEach((link) => {
      const newLink = {
        id: link.id || v4(),
        portFrom: link.from,
        portTo: link.to,
      };
      linkData.push(newLink);
      // setPercent(30 + (20 * linkData.length) / links.length);
    });
  stickies &&
    stickies.forEach((sticky) => {
      const {id, position, title, content} = sticky;
      const newSticky = {
        id: id || v4(),
        title,
        content,
        x: position && position[0],
        y: position && position[1],
      };
      stickyData.push(newSticky);
      // setPercent(30 + (20 * linkData.length) / links.length);
    });
  return {nodes: nodeData, links: linkData, stickies: stickyData, ui};
}
