import React from 'react';
import Radium from 'radium';

import styles from '../../styles/field';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  changeParams(paramId, key, value) {
    const newValues = {...this.props.port, [key]: value};
    this.props.updateParameter(paramId, newValues);
  }

  change(e) {
    const {type, id} = this.props;
    switch (type) {
      case 'boolean':
        this.changeParams(id, 'value', e.target.checked);
        break;
      case 'number':
        this.changeParams(id, 'value', Number(e.target.value));
        break;
      case 'string':
        this.changeParams(id, 'value', e.target.value);
        break;
      default:
        this.changeParams(id, 'value', e.target.value);
        break;
    }
  }

  render() {
    const {
      id,
      name,
      isVisible,
      isIterable,
      type,
      value,
      data,
      isEnabled,
      removeParameter,
    } = this.props;

    if (!name) return null;
    let inputElement;

    switch (type) {
      case 'string':
        inputElement = (
          <input
            type="text"
            disabled={!isEnabled}
            value={value}
            className="form-control"
            id={id}
            onChange={this.change}
          />
        );
        break;
      case 'numeric':
        inputElement = (
          <input
            type="number"
            step="0.01"
            disabled={!isEnabled}
            value={value}
            className="form-control"
            id={id}
            onChange={this.change}
          />
        );
        break;
      case 'boolean':
        inputElement = (
          <input
            type="checkbox"
            className="form-control"
            disabled={!isEnabled}
            checked={value}
            id={id}
            onChange={this.change}
          />
        );
        break;
      case 'select':
        const options = [];
        data.options.forEach((i) => {
          options.push(
              <option key={i} value={i}>
                {i}
              </option>
          );
        });
        inputElement = (
          <select
            value={value}
            id={id}
            disabled={!isEnabled}
            className="form-control"
            onChange={this.change}
          >
            {options}
          </select>
        );
        break;
      default:
        inputElement = (
          <input
            type="text"
            disabled={!isEnabled}
            value={value}
            className="form-control"
            id={id}
            onChange={this.change}
          />
        );
        break;
    }

    let displayStyle = 'inherit';
    if (inputElement.props.className == 'paramsCheckbox') {
      displayStyle = 'flex';
    }
    return (
      <div style={[styles.field]}>
        <div style={{display: displayStyle}}>
          <label htmlFor={id} style={[styles.label]}>
            {name}
          </label>
          {inputElement}
        </div>
        <div key={id} style={[styles.actions]}>
          <div
            style={[styles.visibility]}
            onClick={() => this.changeParams(id, 'isVisible', !isVisible)}
          >
            <i
              className={'fas ' + (isVisible ? 'fa-eye' : 'fa-eye-slash')}
              title={'Make ' + (isVisible ? 'invisible' : 'visible')}
            />{' '}
          </div>
          <div
            style={[styles.visibility]}
            onClick={() => this.changeParams(id, 'isIterable', !isIterable)}
          >
            <i
              style={[styles.icon, !isIterable && styles.icon.toggled]}
              className="fas fa-retweet"
              title={'Make ' + (isIterable ? 'non-iterable' : 'iterable')}
            />{' '}
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              removeParameter(id);
            }}
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    );
  }
}

export default Radium(Field);
