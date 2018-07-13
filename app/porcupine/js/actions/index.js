import {
    ADD_NODE,
    REMOVE_NODE,
    ADD_PORT,
    ADD_PORT_TO_NODE,
    REMOVE_PORT_FROM_NODE,
    REMOVE_PORT,
    UPDATE_PORT,
    ADD_LINK,
    REMOVE_LINK,
    TOGGLE_SIDEBAR,
    HOVER_NODE,
    CLICK_NODE,
    CLICK_SCENE,
} from './actionTypes';

///// SIDEBAR /////
export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR
})


///// NODES /////
export const addNode = (props) => ({
    type: ADD_NODE,
    payload: props,
})

export const deleteNode = (node) => ({
    type: REMOVE_NODE,
    payload: {
      node,
    },
});

export const removePortFromNode = (portId, nodeId) => {
  return ({
    type: REMOVE_PORT_FROM_NODE,
    payload: {
      portId,
      nodeId,
    },
  });
}

export const addPortToNode = (port, nodeId) => ({
    type: ADD_PORT_TO_NODE,
    payload: {
      port,
      nodeId,
    },
})

///// LINKS /////
export const addLink = (props) => ({
    type: ADD_LINK,
    payload: props,
})


///// PORTS /////
export const addPort = (props) => ({
    type: ADD_PORT,
    payload: props,
})

export const updatePort = (portId, newValues) => ({
    type: UPDATE_PORT,
    payload: {
      portId,
      newValues,
    },
})

export const deletePort = (portId) => ({
    type: REMOVE_PORT,
    payload: {
      portId,
    },
});


///// SCENE /////
export const hoverNode = (nodeId) => ({
    type: HOVER_NODE,
    payload: {
      nodeId
    },
})

export const clickNode = (nodeId) => ({
    type: CLICK_NODE,
    payload: {
      nodeId
    },
})

export const clickScene = () => ({
    type: CLICK_SCENE,
})
