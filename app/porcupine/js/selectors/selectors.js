import { createSelector } from "redux-orm";

import orm from "../models/index";


export const nodes = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Node.all().toRefArray();
  }
);

export const portNodes = createSelector(
  // #TODO no idea what to insert here... issue #73
);

export const links = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Link.all().toRefArray();
  }
);
