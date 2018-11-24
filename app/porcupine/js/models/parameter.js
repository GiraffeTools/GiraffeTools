import { Model, many, fk, attr, oneToOne } from "redux-orm";

import Link from "./link";
import Port from "./port";
import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PARAMETER,
  ADD_PARAMETER_TO_NODE,
  REMOVE_PARAMETER,
  UPDATE_PARAMETER,
  ADD_LINK,
  CLEAR_DATABASE
} from "../actions/actionTypes";

class Parameter extends Model {
  static reducer(action, Parameter, session) {
    const { type, payload } = action;
    switch (type) {
      case CLEAR_DATABASE:
        session.Parameter.all()
          .toRefArray()
          .forEach(item => Parameter.withId(item.id).delete());
        break;
      case ADD_NODE:
        const parameters = payload.parameters;
        parameters.forEach(parameter => {
          Parameter.create({
            node: payload.id,
            id: parameter.id,
            name: parameter.name,
            input: parameter.input,
            output: parameter.output,
            isVisible: parameter.isVisible,
            isEnabled: parameter.isEditable,
            value: parameter.value || "" // #TODO insert proper default value
          });
        });
        break;
      case REMOVE_NODE:
        Parameter.all()
          .filter(parameter => parameter.node == payload.id)
          .delete();
        break;
      case ADD_PARAMETER:
        Parameter.create(payload);
        break;
      case ADD_PARAMETER_TO_NODE:
        const { id } = payload;
        if (!Parameter.filter({ id }).exists()) {
          Parameter.create(payload);
        }
        break;
      case REMOVE_PARAMETER:
        Parameter.withId(payload.id).delete();
        break;
      case UPDATE_PARAMETER:
        Parameter.withId(payload.parameterId).update(payload.newValues);
        break;
    }
    return undefined;
  }
}
Parameter.modelName = "Parameter";
Parameter.fields = {
  name: attr(),
  data: attr(), //leaving room for data types here
  isVisible: attr(),
  isEnabled: attr(),
  node: fk({
    to: "Node",
    as: "nodeModel",
    relatedName: "parameters"
  }),
  input: oneToOne({
    to: "Port",
    as: "inputModel",
    relatedName: "inputParent"
  }),
  output: oneToOne({
    to: "Port",
    as: "outputModel",
    relatedName: "outputParent"
  })
};

export default Parameter;
