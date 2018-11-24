import { Model, many, fk, attr } from "redux-orm";

import Port from "./port";
import {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  ADD_PARAMETER_TO_NODE,
  CLEAR_DATABASE
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
      case ADD_PARAMETER_TO_NODE:
        Node.withId(payload.nodeId).parameters.add(payload.parameter);
        break;
      // case REMOVE_PARAMETER_FROM_NODE:
      // Node.withId(payload.nodeId).parameters.add(payload.port);
      // break;
      case UPDATE_NODE:
        Node.withId(payload.nodeId).update(payload.newValues);
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
