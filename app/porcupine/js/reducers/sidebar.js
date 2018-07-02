export default function sidebar(state = [], action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return toggleSidebar(state);
    default:
      return state;
  }
  return state;
}


function toggleSidebar (state) {
  console.log("A");
  var newState = Object.assign({}, state)
  newState.showSidebar = !newState.showSidebar
  return newState;
}
