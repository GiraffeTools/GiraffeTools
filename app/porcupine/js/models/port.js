import { Model, many, attr } from 'redux-orm';

import Link from './link'
import {
  ADD_PORT,
  REMOVE_PORT,
} from '../actions/actionTypes';


class Port extends Model {
  static reducer(action, Port, session) {
    switch (action.type) {
      case ADD_PORT:
        Port.create(action.payload);
        break;
      case REMOVE_PORT:
        const port = Port.withId(action.payload);
        port.delete();
        break;
    }
    return undefined;
  }
}
Port.modelName = "Port";
Port.fields = {
  name: attr(),
  isInput: attr(),
  isOutput: attr(),
  isVisible: attr(),
  iseditable: attr(),
  inputLinks: many("Link", "inputLinks"),
  outputLinks: many("Link", "outputLinks"),
}

export default Port;
