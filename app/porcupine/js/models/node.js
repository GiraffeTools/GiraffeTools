import {Model, many, Schema} from 'redux-orm';

import Node from './node'
import Port from './port'


class Node extends Model {
  static reducer(action, Node, session) {
    switch (action.type) {
      case: 'ADD_NODE':
        Node.create(action.payload);
        break;
      case: 'REMOVE_NODE':
        const node = Book.withId(action.payload);
        node.delete();
        break;
      case: 'ADD_PORT_TO_NODE':
        Noe.withId(action.payload.nodeId).ports.add(action.payload.ports);
        break;
    }
    return undefined;
  }
}

Node.fields = {
  id: attr(),
  x: attr(),
  y: attr(),
  colour: attr(),
  type: attr(),
  ports: many('Port'),
}

export default Node;
