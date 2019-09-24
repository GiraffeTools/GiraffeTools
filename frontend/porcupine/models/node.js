import {Model, attr} from 'redux-orm';

import Graph from '../utils/graph';

import {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  CLEAR_DATABASE,
} from '../actions/actionTypes';

const nameToWidth = (name, parameters) => {
  const nodeFontSize = 13;
  const parameterFontSize = 10;
  const nodeWidth = name.length * nodeFontSize;
  const parameterWidth =
    parameters &&
    Math.max.apply(
        null,
        parameters
            .filter((parameter) => parameter.isVisible)
            .map((parameter) => parameter.name.length)
    ) * parameterFontSize;
  return Math.max(nodeWidth, parameterWidth);
};


class Node extends Model {
  static reducer(action, Node) {
    const {type, payload} = action;
    const graph = Graph.getInstance();

    switch (type) {
      case CLEAR_DATABASE:
        Node.all().delete();
        graph.nodes().forEach((node) => graph.removeNode(node));
        break;
      case ADD_NODE:
        // parameters are saved in the Port reducer
        let name = payload.name;
        while (
          Node.all()
              .filter((node) => node.name === name)
              .toRefArray().length
        ) {
          const match = name.match(/_\d+$/);
          if (match) {
            const number =
              parseInt(match['0'].substr(1, match['0'].length)) + 1;
            name = name.substring(0, match.index) + '_' + number;
          } else {
            name += '_1';
          }
        }
        const width = nameToWidth(name, payload.parameters);
        Node.create({...payload, name, width});
        graph.setNode(payload.id);
        break;
      case REMOVE_NODE:
        const nodeToRemove = Node.withId(payload.id);
        const languages = nodeToRemove.languages.toModelArray();
        languages.forEach((language) => {
          language.update({
            nodes: language.nodes
                .toModelArray()
                .filter((node) => node.id !== payload.id)
                .map((node) => node.id),
          });
          if (!language.nodes.toModelArray().length) language.delete();
        });
        nodeToRemove.delete();
        graph.setNode(payload.id);
        break;
      case UPDATE_NODE:
        const node = Node.withId(payload.nodeId);
        const {newValues} = payload;
        const myName = (newValues && newValues.name) || node.name;
        node.update({
          ...newValues,
          width: nameToWidth(
              myName,
              node.parameters && node.parameters.toRefArray()
          ),
        });
        const x = 0;
        let y = 21;
        node.parameters
            .filter((parameter) => parameter.isVisible)
            .toModelArray()
            .forEach((parameter) => {
              y += 24;
              parameter.input &&
              parameter.inputModel.update({
                x: node.x + x,
                y: node.y + y,
              });
              parameter.output &&
              parameter.outputModel.update({
                x: node.x + x + node.width,
                y: node.y + y,
              });
            });
        break;
    }
    return undefined;
  }
}
Node.modelName = 'Node';
Node.fields = {
  id: attr(),
  // human readable name
  name: attr(),
  // function name
  class: attr(),
  x: attr(),
  y: attr(),
  width: attr(),
  colour: attr(),
  web_url: attr(),
  code: attr(),
};

export default Node;
