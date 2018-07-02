export default function nodes(state = [], action) {
  switch (action.type) {
    case 'ADD_NODE':
      return state;
    case 'REMOVE_NODE':
      return state;
    default:
      return state;
  }
  return state;
}
