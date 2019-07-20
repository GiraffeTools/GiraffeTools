import React, {useState} from 'react';
import Badge from 'react-bootstrap/Badge';
import Collapse from 'react-bootstrap/Collapse';

import DraggablePaneElement from '../../draggables/draggablePaneElement';
import styles from '../../styles/paneGroup';

const NestedPaneGroup = ({categories}) =>
  categories.map((category, index) => (
    <PaneGroup
      key={`${category.name}-${index}`}
      name={category.name}
      subcategories={category.categories}
      nodes={category.nodes}
      colour={category.colour}
    />
  ));

const PaneGroup = ({nodes, subcategories, colour, name}) => {
  const [open, toggleToolbox] = useState(false);

  const nodeGroups = subcategories && (
    <NestedPaneGroup categories={subcategories} />
  );
  const nodeElements =
    nodes &&
    nodes.map((node, index) => {
      const {name} = node;
      node.colour = colour || '#BBB';
      return (
        <DraggablePaneElement
          key={`${name}-${index}`}
          category={node}
          id={name}
        >
          {name}
        </DraggablePaneElement>
      );
    });

  return (
    <div style={styles.panel}>
      <div
        style={styles.panelHeading}
        onClick={() => toggleToolbox(!open)}
        aria-controls="collapse-menu"
        aria-expanded={open}
      >
        <Badge
          style={{...styles.sidebarBadge, backgroundColor: colour || '#BBB'}}
        >
          {' '}
        </Badge>
        {name}
        <span style={styles.sidebarDropdown}>{'>'}</span>
      </div>
      <Collapse in={open} style={styles.panelCollapse}>
        <div id="collapse-menu">
          {nodeGroups}
          {nodes &&
            nodes.map((node, index) => {
              const {name} = node;
              node.colour = colour || '#BBB';
              return (
                <DraggablePaneElement
                  key={`${name}-${index}`}
                  category={node}
                  id={name}
                >
                  {name}
                </DraggablePaneElement>
              );
            })}
        </div>
      </Collapse>
    </div>
  );
};

export default PaneGroup;
