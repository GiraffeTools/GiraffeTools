import React from "react";
import Radium from "radium";

import styles from "../../styles/field";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  changeParams(paramId, key, value) {
    const newValues = { ...this.props.port, [key]: value };
    this.props.updateParameter(paramId, newValues);
  }

  change(e) {
    const dataType =
      this.props.data && this.props.data.type ? this.props.data.type : "text";
    const portId = this.props.id;
    if (dataType === "boolean") {
      this.changeParams(portId, "value", e.target.checked);
    } else if (dataType === "number") {
      this.changeParams(portId, "value", Number(e.target.value));
    } else {
      this.changeParams(portId, "value", e.target.value);
    }
  }

  render() {
    const {
      id,
      name,
      isVisible,
      isIterable,
      value,
      data,
      isEnabled,
      removeParameter,
      selectedNode
    } = this.props;

    if (!name) return null;
    const type = data && data.type ? data.type : "text";
    let inputElement;

    if (type === "text") {
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
    } else if (type === "number") {
      inputElement = (
        <input
          type="number"
          value={value}
          disabled={!isEnabled}
          className="form-control"
          id={id}
          onChange={this.change}
        />
      );
    } else if (type === "float") {
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
    } else if (type === "select") {
      const options = [];
      data.options.forEach(i => {
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
    } else if (type === "boolean") {
      inputElement = (
        <div style={[styles.checkbox]}>
          <input
            type="checkbox"
            disabled={!isEnabled}
            checked={value}
            id={id}
            onChange={this.change}
          />
          <label style={[styles.checkboxLabel]} htmlFor={id} />
        </div>
      );
    }
    let displayStyle = "inherit";
    if (inputElement.props.className == "paramsCheckbox") {
      displayStyle = "flex";
    }

    return (
      <div className="border-top" style={[styles.field]}>
        <div style={{ display: displayStyle }}>
          <label htmlFor={id} style={[styles.label]}>
            {name}
          </label>
          {inputElement}
        </div>
        <div key={id} style={[styles.actions]}>
          <div
            style={[styles.visibility]}
            onClick={() => this.changeParams(id, "isVisible", !isVisible)}
          >
            <i
              className={"fas " + (isVisible ? "fa-eye" : "fa-eye-slash")}
              title={"Make " + (isVisible ? "invisible" : "visible")}
            />{" "}
          </div>
          <div
            style={[styles.visibility]}
            onClick={() => this.changeParams(id, "isIterable", !isIterable)}
          >
            <i
              style={[styles.icon, !isIterable && styles.icon.toggled]}
              className="fas fa-retweet"
              title={"Make " + (isIterable ? "non-iterable" : "iterable")}
            />{" "}
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
