import { Model, attr, fk } from "redux-orm";
import Port from "./port";

import {
  ADD_LINK,
  REMOVE_LINK,
  REMOVE_NODE,
  CLEAR_DATABASE
} from "../actions/actionTypes";

class Link extends Model {
  static reducer(action, Link, session) {
    const { type, payload } = action;
    switch (type) {
      case CLEAR_DATABASE:
        session.Link.all()
          .toRefArray()
          .forEach(item => Link.withId(item.id).delete());
        break;
      case ADD_LINK:
        Link.create(payload);
        break;
      case REMOVE_LINK:
        const link = Link.withId(payload);
        Link.delete();
        break;
      case REMOVE_NODE:
        let connectedLinks = [];
        payload.node.parameters.forEach(port => {
          connectedLinks.push(port.inputLinks);
          connectedLinks.push(port.outputLinks);
        });
        connectedLinks = connectedLinks
          .filter(value => Object.keys(value).length !== 0)
          .reduce((acc, val) => acc.concat(val), []);
        connectedLinks.forEach(link => {
          Link.withId(link.id).delete();
        });
        break;
    }
    return undefined;
  }
}
Link.modelName = "Link";
Link.fields = {
  id: attr(),
  portFrom: fk({
    to: "Port",
    as: "portFromModel",
    relatedName: "outputLinks"
  }),
  portTo: fk({
    to: "Port",
    as: "portToModel",
    relatedName: "inputLinks"
  })
};

export default Link;
