import { Model, many, fk, attr } from "redux-orm";

import Link from "./link";
import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PORT,
  ADD_PORT_TO_NODE,
  REMOVE_PORT,
  UPDATE_PORT,
  REPOSITION_PORTS,
  ADD_LINK,
  CLEAR_DATABASE
} from "../actions/actionTypes";

class Port extends Model {
  static reducer(action, Port, session) {
    const { type, payload } = action;
    switch (type) {
      case CLEAR_DATABASE:
        try {
          session.Port.all()
            .toRefArray()
            .forEach(item => Port.withId(item.id).delete());
        } catch (err) {
          console.log("There were probably duplicate Ports in the database");
        }
        break;
      case ADD_NODE:
        const parameters = payload.parameters;
        parameters.forEach(parameter => {
          parameter.input &&
            Port.create({
              type: "input",
              node: payload.id,
              isVisible: parameter.isVisible,
              id: parameter.input
            });
          parameter.output &&
            Port.create({
              type: "output",
              node: payload.id,
              isVisible: parameter.isVisible,
              id: parameter.output
            });
        });
        break;
      case REPOSITION_PORTS:
        const node = payload.node;
        let x = 0,
          y = 21;
        Port.all()
          .filter(port => port.node == node.id)
          .filter(port => port.isVisible)
          .toRefArray()
          .forEach(port => {
            x = port.type === "input" ? 0 : node.width;
            y += 24;
            Port.withId(port.id).update({
              x: node.x + x,
              y: node.y + y
            });
          });
        break;
      case REMOVE_NODE:
        // payload.node.parameters.forEach(portRef => {
        //   Port.withId(portRef.id).delete();
        // });
        break;
    }
    return undefined;
  }
}
Port.modelName = "Port";
Port.fields = {
  name: attr(),
  type: attr(),
  isVisible: attr(),
  value: attr(),
  x: attr(),
  y: attr(),
  data: attr() //leaving room for data types here
};

export default Port;
