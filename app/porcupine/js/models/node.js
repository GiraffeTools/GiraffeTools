import { Model, many, fk, attr } from 'redux-orm';

import Port from './port'
import {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  ADD_PORT_TO_NODE,
  REMOVE_PORT_FROM_NODE,
} from '../actions/actionTypes';


class Node extends Model {
  static reducer(action, Node, session) {
    const { type, payload } = action;
    switch (type) {
      case ADD_NODE:
        // ports are automatically saved in the Port reducer
        const props = Object.assign({}, payload, { ports: undefined });
        Node.create(payload);
        break;
      case REMOVE_NODE:
        const node = Node.withId(payload.node.id);
        node.delete();
        break;
      case ADD_PORT_TO_NODE:
        Node.withId(payload.nodeId).ports.add(payload.port);
        break;
      case REMOVE_PORT_FROM_NODE:
        const ports = Node.withId(payload.nodeId).ports;
        Node.withId(payload.nodeId).ports = ports.filter(p => p !== payload.portId);
        break;
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
  colour: attr(),
  web_url: attr(),
}

export default Node;
