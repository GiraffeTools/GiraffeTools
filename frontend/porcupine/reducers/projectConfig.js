// A file with general preferences (UI theme, object sizes/colours)
import {
  SET_CONFIG,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  grammars: [],
  files: [],
  nodes: [],
};

const project = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_CONFIG:
      const {grammars, file, files, nodes} = payload.configuration;
      return {
        ...state,
        grammars: grammars || [],
        files: (file && [file]) || files || [],
        nodes: nodes || [],
      };
    default:
      return state;
  }
};

export default project;

