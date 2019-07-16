import { Model, many, attr } from "redux-orm";

import {
  ADD_STICKY,
  REMOVE_STICKY,
  CLEAR_DATABASE
} from "../actions/actionTypes";

class Sticky extends Model {
  static reducer(action, Sticky, session) {
    const { type, payload } = action;
    switch (type) {
      case CLEAR_DATABASE:
        Sticky.all().delete();
        break;
      case ADD_POSTIT:
        Sticky.create({
          text: payload.id
        });
      case REMOVE_STICKY:
        Sticky.withId(payload.id).delete();
        break;
    }
    return undefined;
  }
}
Sticky.modelName = "Sticky";
Sticky.fields = {
  text: attr()
};

export default Sticky;
