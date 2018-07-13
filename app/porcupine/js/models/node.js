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
        Node.withId(payload.node.id).delete();
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
