import {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  ADD_PORT,
  ADD_PORT_TO_NODE,
  REMOVE_PORT,
  UPDATE_PORT,
  REPOSITION_PORTS,
  ADD_LINK,
  REMOVE_LINK,
  START_LINK,
  TOGGLE_SIDEBAR,
  UPDATE_LOADING_PERCENT,
  HOVER_NODE,
  CLICK_NODE,
  CLICK_SCENE,
  SET_MOUSE_STATE,
  CLEAR_DATABASE,
  TOGGLE_CODEEDITOR,
  SET_ACTIVE_TAB,
  SET_USER,
  SET_REPOSITORY
} from "./actionTypes";

export const clearDatabase = () => ({
  type: CLEAR_DATABASE
});

///// LOADING BAR /////
export const updateLoadingPercent = percent => ({
  type: UPDATE_LOADING_PERCENT,
  percent
});

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

///// NODES /////
export const addNode = props => ({
  type: ADD_NODE,
  payload: props
});
export const deleteNode = node => ({
  type: REMOVE_NODE,
  payload: {
    node
  }
});
export const updateNodePosition = (nodeId, offset) => ({
  type: UPDATE_NODE,
  payload: {
    nodeId,
    newValues: {
      x: offset.x,
      y: offset.y
    }
  }
});
export const addPortToNode = (port, nodeId) => ({
  type: ADD_PORT_TO_NODE,
  payload: {
    port,
    nodeId
  }
});

///// LINKS /////
export const addLink = props => ({
  type: ADD_LINK,
  payload: props
});
export const startLink = props => ({
  type: START_LINK,
  payload: props
});
export const deleteLink = linkId => ({
  type: REMOVE_LINK,
  payload: {
    linkId
  }
});

///// PORTS /////
export const addPort = props => ({
  type: ADD_PORT,
  payload: props
});
export const updatePort = (portId, newValues) => ({
  type: UPDATE_PORT,
  payload: {
    portId,
    newValues
  }
});
export const deletePort = portId => ({
  type: REMOVE_PORT,
  payload: {
    portId
  }
});
export const repositionPorts = node => ({
  type: REPOSITION_PORTS,
  payload: {
    node
  }
});

///// SCENE /////
export const hoverNode = nodeId => ({
  type: HOVER_NODE,
  payload: {
    nodeId
  }
});
export const clickNode = nodeId => ({
  type: CLICK_NODE,
  payload: {
    nodeId
  }
});
export const clickScene = () => ({
  type: CLICK_SCENE
});
// export const setMouseState = (props) => ({
//   type: SET_MOUSE_STATE,
//   payload: props,
// });

///// SCENE /////
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
