import {Model, attr, fk} from 'redux-orm';

import {
  ADD_LINK,
  REMOVE_LINK,
  REMOVE_NODE,
  CLEAR_DATABASE,
  REMOVE_PARAMETER,
} from '../actions/actionTypes';

class Link extends Model {
  static reducer(action, Link) {
    const {type, payload} = action;
    switch (type) {
      case CLEAR_DATABASE:
        Link.all().delete();
        break;
      case ADD_LINK:
        if (
          Link.all()
              .filter(
                  (link) =>
                    payload.portFrom === link.portFrom &&
                payload.portTo === link.portTo
              )
              .toRefArray().length
        ) {
          return;
        }
        Link.create(payload);
        break;
      case REMOVE_LINK:
        Link.withId(payload.id).delete();
        break;
      case REMOVE_NODE:
        Link.all()
            .toModelArray()
            .forEach((link) => {
            // #TODO check if this is safe because REMOVE_NODE deletes nodeModel
              if (link.portFromModel.outputParent.nodeModel.id == payload.id) {
                link.delete();
              }
            });
        Link.all()
            .toModelArray()
            .forEach((link) => {
            // #TODO check if this is safe because REMOVE_NODE deletes nodeModel
              if (link.portToModel.inputParent.nodeModel.id == payload.id) {
                link.delete();
              }
            });
        break;
      case REMOVE_PARAMETER:
        Link.all()
            .toModelArray()
            .forEach((link) => {
              if (link.portFromModel.outputParent.id == payload.id) {
                link.delete();
              }
            });
        Link.all()
            .toModelArray()
            .forEach((link) => {
              if (link.portToModel.inputParent.id == payload.id) {
                link.delete();
              }
            });
        break;
    }
    return undefined;
  }
}
Link.modelName = 'Link';
Link.fields = {
  id: attr(),
  portFrom: fk({
    to: 'Port',
    as: 'portFromModel',
    relatedName: 'outputLinks',
  }),
  portTo: fk({
    to: 'Port',
    as: 'portToModel',
    relatedName: 'inputLinks',
  }),
};

export default Link;
