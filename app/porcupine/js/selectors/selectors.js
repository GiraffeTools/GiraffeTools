import { createSelector } from 'redux-orm';

import { orm } from '../models/index';


export const nodesSelector = createSelector(orm, state => state.orm, session => {
  console.log('nodes selector');

  return session.Node.all().toRefArray();
});
