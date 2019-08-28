import React from 'react';
import Radium from 'radium';

import NodePane from '../../containers/nodePane';
import LinkPane from '../../containers/linkPane';
import StickyPane from '../../containers/stickyPane';
import styles from '../../styles/parameterPane';

const ParameterPane = (props) => {
  let content;
  const {selection, clickItem} = props;
  if (selection) {
    const {type} = selection;
    switch (type) {
      case 'node':
        content = <NodePane selection={selection} clickItem={clickItem} />;
        break;
      case 'link':
        content = <LinkPane selection={selection} clickItem={clickItem} />;
        break;
      case 'sticky':
        content = <StickyPane selection={selection} clickItem={clickItem} />;
        break;
      default:
        content = null;
        break;
    }
  } else {
    content = null;
  }

  return (
    <div
      style={{
        ...styles.parameters,
        ...styles.parameters[selection ? 'active' : 'inactive'],
      }}
      className="customScrollbar"
    >
      {content}
    </div>
  );
};

export default Radium(ParameterPane);
