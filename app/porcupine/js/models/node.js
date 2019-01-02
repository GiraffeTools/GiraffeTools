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
    switch (type) {
      case CLEAR_DATABASE:
        Node.all().delete();
        break;
      case ADD_NODE:
        // parameters are automatically saved in the Port reducer
        const props = Object.assign({}, payload, { parameters: undefined });
        Node.create(payload);
        break;
      case REMOVE_NODE:
        Node.withId(payload.id).delete();
        break;
      // case REMOVE_PARAMETER_FROM_NODE:
      // Node.withId(payload.nodeId).parameters.add(payload.port);
      // break;
      case ADD_PARAMETER_TO_NODE:
      // call UPDATE_NODE on adding parameter, so NO break here
      case UPDATE_NODE:
        const node = Node.withId(payload.nodeId);
        node.update(payload.newValues);
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
