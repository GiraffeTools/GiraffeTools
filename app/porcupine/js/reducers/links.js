export default function links(state = [], action) {
  switch (action.type) {
    case 'ADD_LINK':
      return state;
    case 'REMOVE_LINK':
      return state;
    default:
      return state;
  }
  return state;
}
