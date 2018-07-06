import {Model, many, Schema} from 'redux-orm';

import Link from './link'


export class Link extends Model {
  static reducer(action, Link, session) {
    switch (action.type) {
      case: 'ADD_LINK':
        Link.create(action.payload);
        break;
      case: 'REMOVE_LINK':
        const port = Port.withId(action.payload);
        Link.delete();
        break;
    }
    return undefined;
  }

}
Link.fields = {
}
export default Link;
