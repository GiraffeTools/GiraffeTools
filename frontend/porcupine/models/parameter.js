import {Model, fk, attr, oneToOne} from 'redux-orm';

import {
  ADD_NODE,
  REMOVE_NODE,
  ADD_PARAMETER_TO_NODE,
  REMOVE_PARAMETER,
  UPDATE_PARAMETER,
  CLEAR_DATABASE,
} from '../actions/actionTypes';

class Parameter extends Model {
  static reducer(action, Parameter) {
    const {type, payload} = action;
    switch (type) {
      case CLEAR_DATABASE:
        Parameter.all().delete();
        break;
      case ADD_NODE:
        const parameters = payload.parameters;
        parameters &&
          parameters.forEach((parameter) => {
            Parameter.create({
              node: payload.id,
              id: parameter.id,
              name: parameter.name,
              type: parameter.type,
              input: parameter.input,
              output: parameter.output,
              isVisible: parameter.isVisible,
              isIterable: parameter.isIterable,
              isEnabled: parameter.isEditable,
              code: parameter.code,
              value: parameter.value || '', // #TODO insert proper default value
            });
          });
        break;
      case REMOVE_NODE:
        Parameter.filter((parameter) => parameter.node == payload.id)
            .toModelArray()
            .forEach((parameter) => {
              parameter.input && parameter.inputModel.delete();
              parameter.output && parameter.outputModel.delete();
              parameter.delete();
            });
        break;
      case ADD_PARAMETER_TO_NODE:
        const {parameter, nodeId} = payload;

        if (!Parameter.filter({id: parameter.id}).exists()) {
          Parameter.create({
            node: nodeId,
            id: parameter.id,
            name: parameter.name,
            type: parameter.type,
            input: parameter.input,
            output: parameter.output,
            isVisible: parameter.isVisible,
            isIterable: parameter.isIterable,
            isEnabled: parameter.isEditable,
            value: parameter.value || '', // #TODO insert proper default value
          });
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
Parameter.modelName = 'Parameter';
Parameter.fields = {
  name: attr(),
  data: attr(), // leaving room for data types here
  isVisible: attr(),
  isEnabled: attr(),
  isIterable: attr(),
  code: attr(),
  type: attr(),
  node: fk({
    to: 'Node',
    as: 'nodeModel',
    relatedName: 'parameters',
  }),
  input: oneToOne({
    to: 'Port',
    as: 'inputModel',
    relatedName: 'inputParent',
  }),
  output: oneToOne({
    to: 'Port',
    as: 'outputModel',
    relatedName: 'outputParent',
  }),
};

export default Parameter;
