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

export const links = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Link.all().toRefArray();
  }
);
