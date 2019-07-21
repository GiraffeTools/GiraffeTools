import React, {Fragment} from 'react';
import AddParameter from '../../containers/addParameter';
import Fields from './fields';

import styles from '../../styles/parameterPane';
require('../../scss/scrollbar.scss');

const NodePane = (props) => {
  const {selection, clickItem, deleteNode, updateNode} = props;
  if (!selection) return null;

  const {parameters, id, name} = selection;
  const url = selection.web_url;
  // class is a reserved keyword
  const classy = selection.class;
  const documentation = url ? (
    <div style={styles.documentation}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i style={styles.globe} className="fas fa-globe" />
        <span>View documentation</span>{' '}
      </a>
    </div>
  ) : null;
  const fields = parameters ? <Fields parameters={parameters} /> : null;
  const classname = (
    <h6 style={styles.className}>
      class: <i>{classy}</i>{' '}
    </h6>
  );

  return (
    <Fragment>
      <div style={styles.header}>
        <h4 style={styles.name}>
          <input
            style={styles.nameInput}
            onChange={() => updateNode(id, {name: event.target.value})}
            value={name}
            placeholder={'<name>'}
          />
        </h4>
        {classname}
        {documentation}
        <i
          style={styles.close}
          className="fas fa-times"
          onClick={() => clickItem(null)}
          aria-hidden="true"
        />
      </div>
      <div style={styles.fields}>
        <AddParameter nodeId={id} />
        <button
          style={styles.delete}
          className="btn btn-block"
          onClick={() => deleteNode(id)}
        >
          DELETE NODE
        </button>
        {fields}
      </div>
    </Fragment>
  );
};
export default NodePane;
