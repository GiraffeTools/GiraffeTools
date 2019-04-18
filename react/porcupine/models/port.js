import { Model, many, fk, attr } from "redux-orm";

import Link from "./link";
import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PARAMETER_TO_NODE,
  REPOSITION_PORTS,
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
      case ADD_PARAMETER_TO_NODE:
        const { parameter, nodeId } = payload;
        parameter.input &&
          Port.create({
            type: "input",
            node: nodeId,
            isVisible: parameter.isVisible,
            id: parameter.input
          });
        parameter.output &&
          Port.create({
            type: "output",
            node: nodeId,
            isVisible: parameter.isVisible,
            id: parameter.output
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
  type: attr(),
  isVisible: attr(),
  x: attr(),
  y: attr()
};

export default Port;
