

const node = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NODE':
      return {
        id: action.id,
      }
    case 'REMOVE_NODE':
      // #TODO to be implemented in #72
      return state;
    default:
      return state;
  }
};

export default node;
