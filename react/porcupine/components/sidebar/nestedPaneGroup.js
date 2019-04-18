import React from "react";

import PaneGroup from "./paneGroup";

// This class is in a separate file because Radium styles don't work well with
// recursive components
const NestedPaneGroup = ({ categories }) =>
  categories.map(category => (
    <PaneGroup
      key={category.name}
      name={category.name}
      subcategories={category.categories}
      nodes={category.nodes}
      colour={category.colour}
    />
  ));
export default NestedPaneGroup;
