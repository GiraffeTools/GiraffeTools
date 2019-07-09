import React from "react";
import Toggle from 'react-toggle'


const ToolboxModal = ({ onClose, toolboxes, toggleToolbox, showToolboxes }) => {

  const toolboxNames = toolboxes.map(t = t.name);

  return (
    <div className="modal-content">
      <h5 className="modal-title" id="exampleModalLabel">
        Toolboxes
      </h5>
      <div className="modal-body">
        { toolboxNames && toolboxNames.map(t => (
          <Toggle
            defaultChecked={showToolboxes.contains(t)}
            onChange={toggleToolbox}
          />
        ))}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
};

export default ToolboxModal;
