import {Model, attr, fk} from 'redux-orm';

import Graph from '../utils/graph';

import {
  ADD_LINK,
  REMOVE_LINK,
  REMOVE_NODE,
  CLEAR_DATABASE,
  REMOVE_PARAMETER,
  UPDATE_PARAMETER,
} from '../actions/actionTypes';

class Link extends Model {
  static reducer(action, Link) {
    const {type, payload} = action;
    const graph = Graph.getInstance();
    switch (type) {
      case CLEAR_DATABASE:
        Link.all().delete();
        graph.edges().forEach((edge) => graph.removeEdge(edge.v, edge.w));

        break;
      case ADD_LINK:
        if ( // if this conection exists already, return
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
        const link = Link.withId(payload.id);
        const value = link.portFromModel.outputParent.value;
        link.portToModel.inputParent.update({isEnabled: false, value});
        graph.setEdge(
            link.portFromModel.node,
            link.portToModel.node,
            '',
            link.id
        );
        break;
      case REMOVE_LINK:
        const connectedPort = Link.withId(payload.id).portToModel;
        const linkToRemove = Link.withId(payload.id);
        graph.removeEdge(
            linkToRemove.portFromModel.node,
            linkToRemove.portToModel.node,
            linkToRemove.id
        );
        linkToRemove.delete();
        if (!connectedPort.inputLinks.count()) {
          connectedPort.inputParent.update({isEnabled: true});
        }
        break;
      case REMOVE_NODE:
        Link.all()
            .toModelArray()
            .forEach((link) => {
            // #TODO check if this is safe because REMOVE_NODE deletes nodeModel
              if (link.portFromModel.outputParent.nodeModel.id == payload.id) {
                const connectedPort = link.portToModel;
                graph.removeEdge(
                    link.portFromModel.node,
                    link.portToModel.node,
                    link.id
                );
                link.delete();
                if (!connectedPort.inputLinks.count()) {
                  connectedPort.inputParent.update({isEnabled: true});
                }
              }
            });
        Link.all()
            .toModelArray()
            .forEach((link) => {
            // #TODO check if this is safe because REMOVE_NODE deletes nodeModel
              if (link.portToModel.inputParent.nodeModel.id == payload.id) {
                const connectedPort = link.portToModel;
                graph.removeEdge(
                    link.portFromModel.node,
                    link.portToModel.node,
                    link.id
                );
                link.delete();
                if (!connectedPort.inputLinks.count()) {
                  connectedPort.inputParent.update({isEnabled: true});
                }
              }
            });
        break;
      case REMOVE_PARAMETER:
        Link.all()
            .toModelArray()
            .forEach((link) => {
              if (link.portFromModel.outputParent.id == payload.id) {
                graph.removeEdge(
                    link.portFromModel.node,
                    link.portToModel.node,
                    link.id
                );
                link.delete();
              }
            });
        Link.all()
            .toModelArray()
            .forEach((link) => {
              if (link.portToModel.inputParent.id == payload.id) {
                graph.removeEdge(
                    link.portFromModel.node,
                    link.portToModel.node,
                    link.id
                );
                link.delete();
              }
            });
        break;
      case UPDATE_PARAMETER:
        if (!payload.newValues || !payload.newValues.value) return;
        Link.all()
            .toModelArray()
            .forEach((link) => {
              // #TODO check if this is safe when REMOVE_NODE deletes nodeModel
              if (link.portFromModel.outputParent.id == payload.parameterId) {
                link.portToModel.inputParent.update(payload.newValues);
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
