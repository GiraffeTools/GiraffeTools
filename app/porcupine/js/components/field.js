import PropTypes from 'prop-types';
import React from 'react';


class Field extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  changeParams(portId, key, value) {
    const newValues = {...this.props.port, [key]: value};
    this.props.updatePort(portId, newValues);
  }

  change(e) {
    const dataType = this.props.data && this.props.data.type ? this.props.data.type : 'text';
		const portId = this.props.port.id;
    if (dataType === 'boolean') {
      this.changeParams(portId, 'value', e.target.checked);
    } else if(dataType === 'number') {
      this.changeParams(portId, 'value', Number(e.target.value));
    } else {
      this.changeParams(portId, 'value', e.target.value);
    }
  }

  render() {
    const port  = this.props.port;
    const value = port.value || '';
    const type  = port.data && port.data.type ? port.data.type : 'text';
    let inputElement;

    if (type === 'text') {
      inputElement = (
        <input
          type="text"
          disabled={!port.isEnabled}
          value={port.value}
          className="form-control"
          id={port.id}
          onChange={this.change}
        />
      );
    } else if (type === 'number') {
      inputElement = (
        <input
          type="number"
          value={port.value}
          disabled={!port.isEnabled}
          className="form-control"
          id={port.id}
          onChange={this.change}
        />
      );
    } else if (type === 'float') {
      inputElement = (
        <input
          type="number"
          step="0.01"
          disabled={!port.isEnabled}
          value={port.value}
          className="form-control"
          id={port.id}
          onChange={this.change}
        />
      );
    } else if (type === 'select') {
      const options = [];
      port.data.options.forEach(i => {
        options.push(<option key={i} value={i}>{i}</option>);
      });
      inputElement = (
        <select
          value={port.value}
          id={port.id}
          disabled={!port.isEnabled}
          className="form-control"
          onChange={this.change}
        >
          {options}
        </select>
      );
    } else if (type === 'boolean') {
      inputElement = (
        <div className="paramsCheckbox">
          <input
            type="checkbox"
            disabled={!port.isEnabled}
            checked={port.value}
            id={port.id}
            onChange={this.change}
          />
          <label htmlFor={port.id}></label>
        </div>
      );
    }
    let displayStyle = "inherit";
    if (inputElement.props.className == 'paramsCheckbox'){
      displayStyle = "flex";
    }

    const { removePort, removePortFromNode, selectedNode } = this.props;
    return (
      <div>
        <div style={{display: displayStyle}}>
          <label htmlFor={port.id} className="sidebar-heading" style={{fontSize:"0.85em"}}>
            {port.name}
          </label>
             {inputElement}
        </div>
        <div
          key={port.id}
          className="sidebar__node-actions">
          <div className="sidebar__node-visibility" onClick={() => this.changeParams(port.id, 'isVisible', !port.isVisible)} >
            <i
              className={'fas ' + (port.isVisible ? 'fa-eye' : 'fa-eye-slash')}
              title={'Make ' + (port.isVisible ? 'Invisible' : 'Visible')}
            />{' '}
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              // #TODO do this cleaner, and in a single command
              removePortFromNode(port.id, selectedNode.id);
              removePort(port.id);
            }}>
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    );
  }
}

Field.propTypes = {
  data: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  disabled: PropTypes.bool
};


export default Field;
