import { Model, many, fk, attr } from "redux-orm";

import Port from "./port";
import {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  ADD_PARAMETER_TO_NODE,
  CLEAR_DATABASE,
  REPOSITION_PORTS
} from "../actions/actionTypes";

class Node extends Model {
  static reducer(action, Node) {
    const { type, payload } = action;

    const nameToWidth = (name, parameters) => {
      const nodeFontSize = 13;
      const parameterFontSize = 10;
      const nodeWidth = name.length * nodeFontSize;
      const parameterWidth =
        parameters &&
        Math.max.apply(
          null,
          parameters
            .filter(parameter => parameter.isVisible)
            .map(parameter => parameter.name.length)
        ) * parameterFontSize;
      return Math.max(nodeWidth, parameterWidth);
    };

    switch (type) {
      case CLEAR_DATABASE:
        Node.all().delete();
        break;
      case ADD_NODE:
        // parameters are saved in the Port reducer
        const props = Object.assign({}, payload, { parameters: undefined });
        let name = props.name;
        while (
          Node.all()
            .filter(node => node.name === name)
            .toRefArray().length
        ) {
          const match = name.match(/_\d+$/);
          if (match) {
            const number =
              parseInt(match["0"].substr(1, match["0"].length)) + 1;
            name = name.substring(0, match.index) + "_" + number;
          } else {
            name += "_1";
          }
        }
        const width = nameToWidth(name, payload.parameters);
        Node.create({ ...payload, name, width });
        break;
      case REMOVE_NODE:
        Node.withId(payload.id).delete();
        break;
      case UPDATE_NODE:
        const node = Node.withId(payload.nodeId);
        const { newValues } = payload;
        const myName = (newValues && newValues.name) || node.name;
        node.update({
          ...newValues,
          width: nameToWidth(
            myName,
            node.parameters && node.parameters.toRefArray()
          )
        });
        let x = 0;
        let y = 21;
        node.parameters
          .filter(parameter => parameter.isVisible)
          .toModelArray()
          .forEach(parameter => {
            y += 24;
            parameter.input &&
              parameter.input.update({
                x: node.x + x,
                y: node.y + y
              });
            parameter.output &&
              parameter.output.update({
                x: node.x + x + node.width,
                y: node.y + y
              });
          });
        break;
    }
    return undefined;
  }
}
Node.modelName = "Node";
Node.fields = {
  name: attr(),
  class: attr(),
  id: attr(),
  x: attr(),
  y: attr(),
  width: attr(),
  colour: attr(),
  web_url: attr(),
  code: attr(),
  category: attr()
};

export default Node;
