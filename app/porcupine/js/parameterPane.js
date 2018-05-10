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
  changeParams(prop, value) {
    const net = this.props.net;
    let node = net[this.props.selectedNode];
    node = JSON.parse(JSON.stringify(node));
    node.props[prop] = value;
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
        const data = { name: port.name, type: 'text' };
        params.push(
          <Field
            id={port.name}
            key={i}
            data={data}
            disabled={false}
            changeField={this.changeParams}
          />
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