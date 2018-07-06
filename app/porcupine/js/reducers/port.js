

const port = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PORT':
      console.log('port reducer, add function');
      return {
        id: action.id,
        nodeId: action.nodeId,
      }
    case 'REMOVE_PORT':
      // #TODO to be implemented in #72
      return state;
    default:
      return state;
  }
};

export default port;
