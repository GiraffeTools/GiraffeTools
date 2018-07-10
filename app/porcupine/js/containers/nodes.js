import React from 'react';
import { connect } from 'react-redux';

import Node from '../components/node';
import {
	nodes,
} from '../selectors/selectors';


const mapStateToProps = state => ({
		nodes: nodes(state),
})

const mapDispatchToProps = dispatch => ({
});

class Nodes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.nodes.map(node => {
      return (
        <Node
          key 		= {node.id}
	        id  		= {node.id}
          y       = {node.y}
          x       = {node.x}
          name    = {node.name}
          colour  = {node.colour}
          // #TODO insert the right ports here, issue #72
          // ports		= {ports}
        />
      );
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);
