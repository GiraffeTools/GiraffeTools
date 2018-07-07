import { Model, many, attr } from 'redux-orm';

import Port from './port'
import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PORT_TO_NODE,
} from '../actions/actionTypes';


class Node extends Model {
  static reducer(action, Node, session) {
    switch (action.type) {
      case ADD_NODE:
        Node.create(action.payload);
        break;
      case REMOVE_NODE:
        const node = Node.withId(action.payload);
        node.delete();
        break;
      case ADD_PORT_TO_NODE:
        Node.withId(action.payload.nodeId).ports.add(action.payload.id);
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
  ports: many('Port'),
}

export default Node;
