import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "../../scss/toolboxModal.scss";
import styles from "../../styles/toolboxModal.js";

const ToolboxModal = ({ onClose, toolboxes, toggleToolbox, showToolboxes }) => {
  const toolboxNames = toolboxes.map(toolbox => toolbox.name);
  return (
    <div className="modal-content">
      <h5 className="modal-title">Toolboxes</h5>
      <div className="modal-body">
        {toolboxNames &&
          toolboxNames.map((toolbox, index) => (
            <div key={index}>
              <label style={styles.label}>
                <Toggle
                  defaultChecked={
                    showToolboxes && showToolboxes.includes(toolbox)
                  }
                  onChange={() => toggleToolbox(toolbox)}
                />
                <span style={styles.label}>{toolbox}</span>
              </label>
            </div>
          ))}
      </div>
      <div className="modal-body" style={{ fontStyle: "italic" }}>
        (Here, it will soon be possible to more easily customise different
        toolboxes)
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ToolboxModal;
