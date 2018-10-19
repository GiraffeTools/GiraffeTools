import {
  TOGGLE_SIDEBAR,
  TOGGLE_CODEEDITOR,
  UPDATE_LOADING_PERCENT
} from "../actions/actionTypes";

const ui = (state = { showSidebar: true }, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case TOGGLE_CODEEDITOR:
      return { ...state, showCodeEditor: !state.showCodeEditor };
    case UPDATE_LOADING_PERCENT:
      return { ...state, loadingPercent: action.percent };
    default:
      return state;
  }
  return state;
};

export default ui;
