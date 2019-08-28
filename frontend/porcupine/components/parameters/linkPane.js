import React, {Fragment} from 'react';

import styles from '../../styles/parameterPane';
require('../../scss/scrollbar.scss');

const LinkPane = (props) => {
  const {selection, deleteLink} = props;
  if (!selection) return null;

  const {id} = selection;

  return (
    <Fragment>
      <div style={styles.fields}>
        <button
          style={styles.delete}
          className="btn btn-block"
          onClick={() => deleteLink(id)}
        >
          DELETE LINK
        </button>
      </div>
    </Fragment>
  );
};
export default LinkPane;
