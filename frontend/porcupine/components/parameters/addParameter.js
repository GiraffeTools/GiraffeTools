import React, {useState} from 'react';
import {v4} from 'uuid';

import styles from '../../styles/addParameter';

const AddParameter = (props) => {
  const [name, setName] = useState('');
  const [input, setInput] = useState(false);
  const [output, setOutput] = useState(false);

  const {addParameterToNode, updateNode, nodeId} = props;

  const addParameter = () => {
    const parameter = {
      id: v4(),
      name,
      data: '',
      isVisible: true,
      isEditable: true,
      isIterable: false,
    };
    if (input) parameter['input'] = v4();
    if (output) parameter['output'] = v4();
    addParameterToNode(parameter, nodeId);
    updateNode(nodeId);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'input') {
      setInput(target.checked);
    } else if (name === 'output') {
      setOutput(target.checked);
    } else {
      setName(value);
    }
  };

  return (
    <div>
      <div className="form-group" style={styles.addPortForm}>
        <label className="col-form-label">New parameter name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          onChange={handleInputChange}
        />
        <div
          className="d-flex justify-content-between"
          style={styles.ioGroup}
        >
          <div>
            <input
              type="checkbox"
              name="input"
              onChange={handleInputChange}
            />
            <label style={styles.checkboxLabel}>input</label>
          </div>
          <div style={styles.boxGroup}>
            <label style={styles.checkboxLabel}>output</label>
            <input
              type="checkbox"
              name="output"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          style={styles.add}
          className="btn btn-block"
          onClick={addParameter}
        >
          <i className="fas fa-plus" style={styles.addPort} />
          Add parameter
        </button>
      </div>
    </div>
  );
};
export default AddParameter;
