import React from 'react';
import { connect } from 'react-redux';


class Fields extends React.component {
  constructor(props) {
    super(props);
  }

  render() {
    const params = [];
    const props = [];
    Object.keys(node.ports).forEach(i => {
      const port = node.ports[i];
      const visibleIconClassName = port.visible ? 'fa-eye' : 'fa-eye-slash';
      const visibilityText = port.visible ? 'Invisible' : 'Visible';
      {/*const iteratorClassName = port.iterator ? 'retweet' : 'retweet';*/}
      {/*const iteratorText = port.iterator ? 'Iterate over this variable' : 'Do not iterate over the variable';*/}
      params.push(
        [
        <Field
          id={`${port.name}_text`}
          key={`${port.name}_text`}
          value={port.value || ''}
          data={{ name: port.name, type: 'text', label: port.name.toUpperCase() }}
          disabled={!port.editable}
          changeField={(value) => this.changeParams(port.name, 'value', value)}
        />,
        <div
          key={`${port.name}_actions`}
          className="sidebar__node-actions">
          <div className="sidebar__node-visibility" onClick={() => this.changeParams(port.name, 'visible', !port.visible)} >
            <i className={`fas ${visibleIconClassName}`} title={`Make ${visibilityText}`} />{' '}
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.removePort(port.name)}>
            <i className="fas fa-trash-alt" />
          </button>
        </div>
        ]
      );
    });

    return (
      <form className="form-horizontal">
        {params}
      </form>
    );
  }
};
