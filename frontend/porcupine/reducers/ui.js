import {
  TOGGLE_SIDEBAR,
  TOGGLE_CODEEDITOR,
  SET_ACTIVE_TAB,
  UPDATE_LOADING_PERCENT,
  SET_SEARCH_TEXT,
  TOGGLE_TOOLBOX,
  ADD_TOOLBOX_NODES
} from "../actions/actionTypes";

const INITIAL_STATE = {
  showSidebar: false,
  showToolboxes: [],
  searchText: "",
  showCodeEditor: false,
  toolboxes: [],
  activeTab: undefined,
  loadingPercent: -1
};

const ui = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case TOGGLE_CODEEDITOR:
      return { ...state, showCodeEditor: !state.showCodeEditor };
    case TOGGLE_TOOLBOX:
      const { toolbox } = payload;
      if (!state.showToolboxes) {
        return { ...state, showToolboxes: [toolbox] };
      } else if (state.showToolboxes.includes(toolbox)) {
        const showToolboxes = state.showToolboxes.filter(
          toolboxName => toolbox != toolboxName
        );
        return { ...state, showToolboxes };
      } else {
        const showToolboxes = [toolbox].concat(state.showToolboxes);
        return { ...state, showToolboxes };
      }
    case ADD_TOOLBOX_NODES:
      return {
        ...state,
        toolboxes: [...payload.toolboxes, ...state.toolboxes]
      };
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: payload.tab };
    case SET_SEARCH_TEXT:
      return { ...state, searchText: payload.text };
    case UPDATE_LOADING_PERCENT:
      return { ...state, loadingPercent: action.percent };
    default:
      return state;
  }
  return state;
};

export default ui;
