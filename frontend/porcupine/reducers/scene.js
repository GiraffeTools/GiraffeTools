import {
  ZOOM_IN,
  ZOOM_OUT,
  ADD_NODE,
  HOVER_PORT,
  CLICK_ITEM,
  COPY_NODES,
  REMOVE_NODE,
  SET_MOUSE_STATE
} from "../actions/actionTypes";
import { nodesWithParameters, linksWithPorts } from "../selectors/selectors";

const INITIAL_STATE = {
  hoveredPort: null,
  selection: {
    links: null,
    nodes: null
  },
  copyNodes: null
};

export default function scene(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case ADD_NODE:
      return { ...state, selection: { nodes: [payload.id], links: null } };
    case HOVER_PORT:
      return {
        ...state,
        hoveredPort: { id: payload.portId, type: payload.type }
      };
    case COPY_NODES:
      return { ...state, copyNodes: payload.nodeIds };
    case REMOVE_NODE:
      return {
        ...state,
        selection: {
          links: state.selection.links,
          nodes: null
        }
      };
    case CLICK_ITEM:
      const selection = {
        nodes:
          payload.item === "node" &&
          !(
            state.selection.nodes &&
            state.selection.nodes.includes(payload.id) &&
            state.selection.nodes.length == 1
          )
            ? [payload.id]
            : null,
        links:
          payload.item === "link" &&
          !(
            state.selection.links &&
            state.selection.links.includes(payload.id) &&
            state.selection.links.length == 1
          )
            ? [payload.id]
            : null
      };
      return { ...state, selection };
    default:
      return state;
  }
  return state;
}
