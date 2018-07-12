import React from 'react';
import { connect } from 'react-redux';

import Node from '../components/node';
import {
	nodesWithPorts,
} from '../selectors/selectors';


const mapStateToProps = state => ({
		nodesWithPorts: nodesWithPorts(state),
})

const mapDispatchToProps = dispatch => ({
});

class Nodes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.nodesWithPorts.map(node => {
      return (
        <Node
          key 		= {node.id}
	        id  		= {node.id}
          y       = {node.y}
          x       = {node.x}
          name    = {node.name}
          colour  = {node.colour}
          ports		= {node.ports}
        />
      );
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);
