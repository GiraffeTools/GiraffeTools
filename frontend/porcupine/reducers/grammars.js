import {ADD_GRAMMAR} from '../actions/actionTypes';

const INITIAL_STATE = {
  grammars: [],
};

const grammars = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_GRAMMAR:
      return {...state, grammars: state.grammars.concat(payload.grammar)};
    default:
      return state;
  }
};

export default grammars;
