import PropTypes from 'prop-types';
import React from 'react';
import Field from './field';

class ParameterPane extends React.Component {
  constructor(props) {
    super(props);
    this.changeParams = this.changeParams.bind(this);
    this.close = this.close.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  changeParams(portName, key, value) {
    const net = this.props.net;
    let node = { ...net[this.props.selectedNode] };
    const port = node.ports.filter(port => port.name === portName)[0];
    if (key === 'value' && !port.editable) {
      return;
    }

    port[key] = value;
    this.props.modifyNode(node);
  }
  close() {
    this.props.changeSelectedNode(null);
  }
  handleKeyPress(event) {
    if (event.key == 'Delete') {
      this.props.deleteNode(this.props.selectedNode);
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  render() {
    if (this.props.selectedNode) {
      const params = [];
      const props = [];
      const node = this.props.net[this.props.selectedNode];

      Object.keys(node.ports).forEach(i => {
        const port = node.ports[i];
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
          <Field
            id={`${port.name}_checkbox`}
            key={`${i.name}_checkbox`}
            data={{ type: 'checkbox', label: 'Visible' }}
            value={port.visible}
            disabled={false}
            changeField={(value) => this.changeParams(port.name, 'visible', value)}
            />
          ]
        );
      });

      return (
        <div className="setparams setparamsActive" >
          <div className="setHead">
            <h5 className="sidebar-heading">NODE SELECTED</h5>
            <h4>{node.title.name}</h4>
            <span className="glyphicon glyphicon-remove-sign closeSign" onClick={() => this.close()} aria-hidden="true"></span>
          </div>
          <div className="setContain">
            <form className="form-horizontal">
              {params}
            </form>
            <br />
            <button
              type="button"
              className="btn btn-block deleteLayerButton sidebar-heading"
              onClick={() => this.props.deleteNode(this.props.selectedNode)}
            >
              DELETE NODE
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-md-3 setparams" >
          <div className="setHead" style={{ color: 'white' }}>
            Settings
          </div>
          <div style={{ padding: '30px' }}>
            select a node to set its parameters
          </div>
        </div>
      );
    }
  }
}

ParameterPane.propTypes = {
  selectedNode: PropTypes.string,
  net: PropTypes.object,
  deleteNode: PropTypes.func,
  modifyNode: PropTypes.func,
  changeSelectedNode: PropTypes.func
};

export default ParameterPane;
