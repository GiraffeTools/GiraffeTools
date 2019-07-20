import React, { Fragment } from "react";
import AddParameter from "../../containers/addParameter";
import Fields from "./fields";

import styles from "../../styles/parameterPane";
require("../../scss/scrollbar.scss");

const StickyPane = props => {
  const { selection, clickItem, deleteSticky, updateSticky } = props;
  if (!selection) return null;

  const { title, content, id } = selection;

  return (
    <Fragment>
      <div style={styles.header}>
        <h4 style={styles.name}>
          <input
            style={styles.nameInput}
            onChange={event => updateSticky(id, { title: event.target.value })}
            value={title || ""}
            placeholder={"<name>"}
          />
        </h4>
        <i
          style={styles.close}
          className="fas fa-times"
          onClick={() => clickItem(null)}
          aria-hidden="true"
        />
      </div>
      <div style={styles.fields}>
        <div style={styles.field}>
          <label htmlFor={id} style={styles.label}>
            {"content"}
          </label>
          <input
            type="text"
            value={content}
            className="form-control"
            id={id}
            onChange={event =>
              updateSticky(id, { content: event.target.value })
            }
          />
        </div>
        <button
          style={styles.delete}
          className="btn btn-block"
          onClick={() => deleteSticky(id)}
        >
          DELETE POST-IT
        </button>
      </div>
    </Fragment>
  );
};
export default StickyPane;
