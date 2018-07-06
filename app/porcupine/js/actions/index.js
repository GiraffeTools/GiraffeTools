import {
    ADD_NODE,
    REMOVE_NODE,
    ADD_PORT,
    ADD_PORT_TO_NODE,
    REMOVE_PORT,
    ADD_LINK,
    REMOVE_LINK,
    TOGGLE_SIDEBAR,
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
