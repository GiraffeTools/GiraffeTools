import React from "react";

import PaneGroup from "./paneGroup"

const NestedPaneGroup = ({ categories }) =>(
  Object.keys(categories).map(category => (
    <PaneGroup
      key={category}
      category={category}
      nodes={categories[category]}
    />
  ))
)

export default NestedPaneGroup;
