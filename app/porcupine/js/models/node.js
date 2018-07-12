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
        // The following replaces the ports with just the id
        // Ports are save separately
        const portIds = payload.ports.map(port => port.id);
        const props = Object.assign({}, payload, { ports: portIds });
        Node.create(props);
        break;
      case REMOVE_NODE:
        const node = Node.withId(payload.nodeId);
        node.delete();
        break;
      case ADD_PORT_TO_NODE:
        Node.withId(payload.nodeId).ports.add(payload.port);
        break;
      case REMOVE_PORT_FROM_NODE:
        Node.withId(payload.nodeId).ports.remove(payload.port);
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
  // ports: many('Port'),
}

export default Node;
