import {Model, many, Schema} from 'redux-orm';

import Link from './link'
import Port from './port'
import {
  ADD_PORT,
  REMOVE_PORT,
} from '../actions/actionTypes';

class Port extends Model {
  static reducer(action, Port, session) {
    switch (action.type) {
      case: ADD_PORT:
        Port.create(action.payload);
        break;
      case: REMOVE_PORT:
        const port = Port.withId(action.payload);
        port.delete();
        break;
    }
    return undefined;
  }
}
Port.fields = {
  name: attr(),
  isInput: attr(),
  isOutput: attr(),
  isVisible: attr(),
  iseditable: attr(),
  inputlinks: many("Link"),
  outputlinks: many("Link"),
}

export default Port;
