import { Model, many, fk, attr } from 'redux-orm';

import Link from './link'
import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PORT,
  ADD_PORT_TO_NODE,
  REMOVE_PORT,
  UPDATE_PORT,
  ADD_LINK,
  CLEAR_DATABASE,
} from '../actions/actionTypes';


class Port extends Model {
  static reducer(action, Port, session) {
    const { type, payload } = action;
    switch (type) {
      case CLEAR_DATABASE:
        session.Port.all().toRefArray().forEach(item => Port.withId(item.id).delete());
        break;
      case ADD_NODE:
        const ports = payload.ports;
        ports.forEach(port => {
          Port.create({
            node: payload.id,
    				id: port.id,
    				name: port.name,
    				isInput: port.input,
    				isOutput: port.output,
    				isVisible: port.visible,
    				isEnabled: port.editable,
            inputPortRef: port.inputPortRef,
            outputPortRef: port.outputPortRef,
            value: port.value || '',  // #TODO insert proper default value
      		});
        });
        break;
      case REMOVE_NODE:
        payload.node.ports.forEach(portRef => {
          Port.withId(portRef.id).delete();
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
  inputPortRef: attr(),
  outputPortRef: attr(),
  node: fk({
      to: 'Node',
      as: 'nodeModel',
      relatedName: 'ports',
  }),
}

export default Port;
