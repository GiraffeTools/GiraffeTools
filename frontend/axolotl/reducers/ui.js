const INITIAL_STATE = {};

const ui = (state = INITIAL_STATE, action) => {
  // const {type, payload} = action;
  const {type} = action;
  switch (type) {
    default:
      return state;
  }
  return state;
};

export default ui;
