import React from 'react';
import Radium from 'radium';

import styles from '../../styles/paneElement';

const PaneElement = (props) => {
  const {isDragging, id} = props;

  return (
    <div
      className="btn btn-block"
      draggable="true"
      style={[styles.paneElement, {opacity: isDragging ? 0.5 : 1}]}
      id={id}
    >
      {props.children}
    </div>
  );
};

export default Radium(PaneElement);
