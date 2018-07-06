import { combineReducers } from 'redux';

import port from './port';


const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PORT':
    case 'TOGGLE_VISIBILTY':
      return {
        ...state,
        [action.id]: port(state[action.id], action),
      };
    case 'REMOVE_PORT':
      // #TODO to be implemented in #72
      return state;
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PORT':
      return [...state, action.id];
    default:
      return state;
  }
};

const ports = combineReducers({
  byId,
  allIds,
});

const getPortsNode = (state) =>
  state.allIds.map(nodeId => state.byId[nodeId]);

export default ports;
