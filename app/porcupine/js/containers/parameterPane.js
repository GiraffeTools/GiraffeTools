import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Fields from '../containers/fields';
import {
  clickNode,
  deleteNode,
} from '../actions/index';
import {
	selectedNode,
} from '../selectors/selectors';


class ParameterPane extends React.Component {
  constructor(props) {
    super(props);
    this.changeParams = this.changeParams.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  changeParams(portName, key, value) {
    // const net = this.props.net;
    // let node = { ...net[this.props.selectedNode] };
    // const port = node.ports.filter(port => port.name === portName)[0];
    // if (key === 'value' && !port.editable) {
    //   return;
    // }
    //
    // port[key] = value;
    // this.props.modifyNode(node);
  }

  removePort(portName) {
    // const { net, modifyNode } = this.props;
    // let node = { ...net[this.props.selectedNode] };
    // node.ports = node.ports.filter(port => port.name !== portName);
    // modifyNode(node);
  }

  handleKeyPress(event) {
    if (event.key == 'Delete') {
      deleteNode(this.props.selectedNode.id);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    const node = this.props.selectedNode;
    return (
      <div className={"setparams" + (node ? " setparamsActive" : "")} >
        <div className="setHead">
          <h4 className="sidebar__node-name">
            {(node ? node.name : "Settings")}
          </h4>
          <div className="sidebar__node-documentation">
            {/*
            <a href={node.title.web_url} target="_blank">
              <i className="fas fa-globe sidebar__globe-icon"></i>
                <span>View documentation</span>{' '}
            </a>
            */}
          </div>
          <i className="fas fa-times sidebar__close-icon"
            onClick={() => this.props.clickNode(null)}
            aria-hidden="true"/>
        </div>
        <div className="setContain">
          {node && node.ports ? <Fields /> : ''}
          <br />
          <button
            type="button"
            className="btn btn-block deleteLayerButton sidebar-heading"
            onClick={() => {
              this.props.deleteNode(node.id);
              this.props.clickNode(null);}
            }
          >
            DELETE NODE
          </button>
        </div>
      </div>
    );
  }
}

ParameterPane.propTypes = {
  modifyNode: PropTypes.func,
  changeSelectedNode: PropTypes.func
};

const mapStateToProps = state => ({
  selectedNode: selectedNode(state),
})

const mapDispatchToProps = dispatch => ({
  deleteNode: (nodeId) => dispatch(deleteNode(nodeId)),
  clickNode: (nodeId) => dispatch(clickNode(nodeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterPane)
