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

  removePort(portName) {
    const { net, modifyNode } = this.props;
    let node = { ...net[this.props.selectedNode] };
    node.ports = node.ports.filter(port => port.name !== portName);
    modifyNode(node);
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
        <div className="setparams setparamsActive" >
          <div className="setHead">
            <h4 className="sidebar__node-name">
              {node.title.name}
            </h4>
            <div className="sidebar__node-documentation">
              <a href={node.title.web_url} target="_blank">
                <i className="fas fa-globe sidebar__globe-icon"></i>
                  <span>View documentation</span>{' '}
              </a>
            </div>
            <i className="fas fa-times sidebar__close-icon"
              onClick={() => this.close()}
              aria-hidden="true"/>
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
