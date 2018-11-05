import {
  TOGGLE_SIDEBAR,
  TOGGLE_CODEEDITOR,
  SET_ACTIVE_TAB,
  UPDATE_LOADING_PERCENT
} from "../actions/actionTypes";

const INITIAL_STATE = {
  showSidebar: false,
  showCodeEditor: false,
  activeTab: "Nipype",
  loadingPercent: -1
};

const ui = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case TOGGLE_CODEEDITOR:
      return { ...state, showCodeEditor: !state.showCodeEditor };
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: payload.tab };
    case UPDATE_LOADING_PERCENT:
      return { ...state, loadingPercent: action.percent };
    default:
      return state;
  }
  return state;
};

export default ui;
