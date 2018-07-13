import { Model, many, fk, attr } from 'redux-orm';

import Link from './link'
import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PORT,
  ADD_PORT_TO_NODE,
  REMOVE_PORT,
  UPDATE_PORT,
} from '../actions/actionTypes';


class Port extends Model {
  static reducer(action, Port, session) {
    const { type, payload } = action;
    switch (type) {
      case ADD_NODE:
        const ports = payload.ports;
        ports.forEach(port => {
          Port.create({
    				id: port.id,
    				name: port.name,
    				isInput: port.input,
    				isOutput: port.output,
    				isVisible: port.visible,
    				isEnabled: port.editable,
            value: port.value || '',  // #TODO insert proper default value
      		});
        });
        break;
      case REMOVE_NODE:
        payload.node.ports.forEach(portId => {
          const port = Port.withId(portId);
          port.delete();
        });
        break;
      case ADD_PORT:
        Port.create(payload);
        break;
      case ADD_PORT_TO_NODE:
        if (!Port.filter({ id: payload.id }).exists()) {
            Port.create(payload);
        }
        break;
      case REMOVE_PORT:
        const port = Port.withId(payload.portId);
        port.delete();
        break;
      case UPDATE_PORT:
        Port.withId(payload.portId).update(payload.newValues);
        break;
    }
    return undefined;
  }
}
Port.modelName = "Port";
Port.fields = {
  name: attr(),
  value: attr(),
  data: attr(), //leaving room for data types here
  isInput: attr(),
  isOutput: attr(),
  isVisible: attr(),
  isEnabled: attr(),
  inputLinks: many("Link", "inputLinks"),
  outputLinks: many("Link", "outputLinks"),
}

export default Port;
