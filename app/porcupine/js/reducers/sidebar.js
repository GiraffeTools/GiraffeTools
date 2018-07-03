import { sidebarFilter } from '../actions';


const sidebar = (state = {showSidebar: true}, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {...state, showSidebar: !state.showSidebar}
    default:
      return state;
  }
  return state;
}

export default sidebar
