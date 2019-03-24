import {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  ADD_PARAMETER_TO_NODE,
  REMOVE_PARAMETER,
  UPDATE_PARAMETER,
  ADD_LINK,
  REMOVE_LINK,
  START_LINK,
  TOGGLE_SIDEBAR,
  UPDATE_LOADING_PERCENT,
  HOVER_PORT,
  CLICK_ITEM,
  SET_MOUSE_STATE,
  CLEAR_DATABASE,
  TOGGLE_CODEEDITOR,
  SET_SEARCH_TEXT,
  COPY_NODES,
  SET_ACTIVE_TAB,
  SET_USER,
  SET_REPOSITORY,
  SET_BRANCH,
  SET_COMMIT,
  SET_PORK_FILE,
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_TOOLBOX,
  ADD_TOOLBOX_NODES
} from "./actionTypes";
import { UPDATE_AUTH } from "../../../giraffe/js/actions/actionTypes";

export const clearDatabase = () => ({
  type: CLEAR_DATABASE
});

///// LOADING BAR /////
export const updateLoadingPercent = percent => ({
  type: UPDATE_LOADING_PERCENT,
  percent
});

///// UI /////
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});
export const toggleCodeEditor = () => ({
  type: TOGGLE_CODEEDITOR
});
export const setActiveTab = tab => ({
  type: SET_ACTIVE_TAB,
  payload: {
    tab
  }
});
export const setSearchText = text => ({
  type: SET_SEARCH_TEXT,
  payload: {
    text
  }
});
export const toggleToolbox = toolbox => ({
  type: TOGGLE_TOOLBOX,
  payload: {
    toolbox
  }
});

///// NODES /////
export const addNode = props => ({
  type: ADD_NODE,
  payload: props
});
export const deleteNode = id => ({
  type: REMOVE_NODE,
  payload: {
    id
  }
});
export const updateNode = (nodeId, newValues) => ({
  type: UPDATE_NODE,
  payload: {
    nodeId,
    newValues
  }
});
export const addParameterToNode = (parameter, nodeId) => ({
  type: ADD_PARAMETER_TO_NODE,
  payload: {
    parameter,
    nodeId
  }
});
export const addToolboxNodes = toolboxes => ({
  type: ADD_TOOLBOX_NODES,
  payload: {
    toolboxes
  }
});

///// LINKS /////
export const addLink = props => ({
  type: ADD_LINK,
  payload: props
});
export const startLink = portId => ({
  type: START_LINK,
  payload: {
    portId
  }
});
export const deleteLink = id => ({
  type: REMOVE_LINK,
  payload: {
    id
  }
});

///// PORTS /////
export const updateParameter = (parameterId, newValues) => ({
  type: UPDATE_PARAMETER,
  payload: {
    parameterId,
    newValues
  }
});
export const deleteParameter = id => ({
  type: REMOVE_PARAMETER,
  payload: {
    id
  }
});

///// SCENE /////
export const hoverPort = (portId, type) => ({
  type: HOVER_PORT,
  payload: {
    portId,
    type
  }
});
export const clickItem = (id, item) => ({
  type: CLICK_ITEM,
  payload: {
    id,
    item
  }
});
export const copyItems = nodeIds => ({
  type: COPY_NODES,
  payload: {
    nodeIds
  }
});
// export const setMouseState = (props) => ({
//   type: SET_MOUSE_STATE,
//   payload: props,
// });

///// SCENE /////
export const updateAuth = user => ({
  type: UPDATE_AUTH,
  payload: {
    user
  }
});
export const setUser = user => ({
  type: SET_USER,
  payload: {
    user
  }
});
export const setRepository = repository => ({
  type: SET_REPOSITORY,
  payload: {
    repository
  }
});
export const setBranch = branch => ({
  type: SET_BRANCH,
  payload: {
    branch
  }
});
export const setCommit = commit => ({
  type: SET_COMMIT,
  payload: {
    commit
  }
});
export const setPorkFile = pork_file => ({
  type: SET_PORK_FILE,
  payload: {
    pork_file
  }
});

///// MODALS /////
export const openModal = item => ({
  type: OPEN_MODAL,
  payload: {
    item
  }
});
export const closeModal = id => ({
  type: CLOSE_MODAL,
  payload: {
    id
  }
});
