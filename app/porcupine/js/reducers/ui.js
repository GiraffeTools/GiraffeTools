import { TOGGLE_SIDEBAR, TOGGLE_CODEEDITOR } from "../actions/actionTypes";

const ui = (state = { showSidebar: true }, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case TOGGLE_CODEEDITOR:
      return { ...state, showCodeEditor: !state.showCodeEditor };
    default:
      return state;
  }
  return state;
};

export default ui;
