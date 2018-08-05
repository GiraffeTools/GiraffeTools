const defaultState = {
  scene: {
    selectedNode: null,
    hoveredNode: null,
    linkInConstruction: null,
    zoomLevel: 1,
  },
  ui: {
    showSidebar: false,
    showCodeEditor: false,
    loadingPercent: -1
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    //
  }
}
