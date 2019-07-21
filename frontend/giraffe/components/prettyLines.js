import React, {Fragment} from 'react';
import Radium from 'radium';

import styleSheet from '../constants/styles';
import styles from '../styles/prettyLines';

const PrettyLine = ({color}) => {
  const separatorColor = color || 'black';
  // const separatorThickness = '2px';

  return (
    <div className="float-left" style={styles.lines}>
      <div
        style={{
          ...styles.circle,
          borderColor: separatorColor,
          // borderWidth: separatorThickness
        }}
      />
      <div
        style={{
          ...styles.line,
          borderLeftColor: separatorColor,
          // borderWidth: separatorThickness
        }}
      />
    </div>
  );
};

const PrettyLines = () => (
  <Fragment>
    <PrettyLine color={styleSheet.secondaryColor} />
    <PrettyLine color={styleSheet.primaryColor} />
    <PrettyLine color={styleSheet.secondaryColor} />
  </Fragment>
);

export default Radium(PrettyLines);
