export default function parameters(state = [], action) {
  switch (action.type) {
    case 'CHANGE_PARAMETER_VALUE':
      return state;
    case 'TOGGLE_PARAMETER_VISIBILITY':
      return state;
    case 'TOGGLE_PARAMETER_ITERABLE':
      return state;
    default:
      return state;
  }
  return state;
}
