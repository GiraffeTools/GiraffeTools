import React from 'react';
import Radium from 'radium';
import {v4} from 'uuid';

import styles from '../../styles/addParameter';

class AddParameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      input: false,
      output: false,
    };
    this.addParameter = this.addParameter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addParameter() {
    const {addParameterToNode, updateNode, nodeId} = this.props;
    const {name, input, output} = this.state;
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
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'input' || name === 'output') {
      this.setState({
        [name]: target.checked,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="form-group" style={[styles.addPortForm]}>
          <label className="col-form-label">New parameter name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.handleInputChange}
          />
          <div
            className="d-flex justify-content-between"
            style={[styles.ioGroup]}
          >
            <div>
              <input
                type="checkbox"
                name="input"
                onChange={this.handleInputChange}
              />
              <label style={[styles.checkboxLabel]}>input</label>
            </div>
            <div style={[styles.boxGroup]}>
              <label style={[styles.checkboxLabel]}>output</label>
              <input
                type="checkbox"
                name="output"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <button
            style={[styles.add]}
            className="btn btn-block"
            onClick={this.addParameter}
          >
            <i className="fas fa-plus" style={[styles.addPort]} />
            Add parameter
          </button>
        </div>
      </div>
    );
  }
}

export default Radium(AddParameter);
