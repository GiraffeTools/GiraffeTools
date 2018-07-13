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
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
              this.props.deleteNode(node);
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
  deleteNode: (node) => dispatch(deleteNode(node)),
  clickNode: (nodeId) => dispatch(clickNode(nodeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterPane)
