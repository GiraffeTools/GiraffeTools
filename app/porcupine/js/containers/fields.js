import React from 'react';
import { connect } from 'react-redux';

import Field from '../components/field'
import {
  selectedPorts,
} from '../selectors/selectors'


class Fields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ports = this.props.selectedPorts;
    // console.log(ports);
    const params = [];
    const props = [];
    Object.keys(ports).forEach(i => {
      const port = ports[i];
      {/*const iteratorClassName = port.iterator ? 'retweet' : 'retweet';*/}
      {/*const iteratorText = port.iterator ? 'Iterate over this variable' : 'Do not iterate over the variable';*/}
      params.push(
        [
        <Field
          id={`${port.name}_text`}
          key={`${port.name}_text`}
          value={port.value || ''}
          data={{ name: port.name, type: 'text', label: port.name.toUpperCase() }}
          disabled={!port.isEditable}
          changeField={(value) => this.changeParams(port.name, 'value', value)}
        />,
        <div
          key={`${port.name}_actions`}
          className="sidebar__node-actions">
          <div className="sidebar__node-visibility" onClick={() => this.changeParams(port.name, 'visible', !port.isVisible)} >
            <i
              className={'fas ' + (port.isVisible ? 'fa-eye' : 'fa-eye-slash')}
              title={'Make ' + (port.isVisible ? 'Invisible' : 'Visible')}
            />{' '}
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

const mapStateToProps = state => ({
		selectedPorts: selectedPorts(state),
})

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fields);
