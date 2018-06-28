export default function scene(state = [], action) {
  switch (action.type) {
    case 'ZOOM_IN':
      return state;
    case 'ZOOM_OUT':
      return state;
    default:
      return state;
  }
  return state;
}
