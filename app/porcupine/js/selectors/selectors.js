import { createSelector } from "redux-orm";

import orm from "../models/index";


export const nodes = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Node.all().toRefArray();
  }
);

export const nodesWithPorts = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Node.all().toRefArray().map(node => {
      const obj = Object.assign({}, node);
      obj.ports = node.ports.map(portId => session.Port.withId(portId).ref);
      return obj;
    });
  }
);

export const selectedNode = createSelector(
  orm,
  state => state.orm,
  state => state.scene.selectedNode,
  (orm, selectedNode) => ( orm.Node.withId(selectedNode) ? orm.Node.withId(selectedNode).ref : null )
);
export const selectedPorts = createSelector(
  orm,
  state => state.orm,
  state => state.scene.selectedNode,
  (orm, selectedNode) => {
    return (
      orm.Node.withId(selectedNode) ?
      orm.Node.withId(selectedNode).ports.map(portId => orm.Port.withId(portId).ref) :
      null
    )}
);

export const hoveredNode = createSelector(
  orm,
  state => state.orm,
  state => state.scene.hoveredNode,
  (orm, hoveredNode) => {
    if (!hoveredNode) {
      return null;
    }
    const obj = Object.assign({}, orm.Node.withId(hoveredNode).ref);
    obj.ports = obj.ports.map(portId => orm.Port.withId(portId).ref);
    return obj;
  }
);


export const links = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Link.all().toRefArray();
  }
);
