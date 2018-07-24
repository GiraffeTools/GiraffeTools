import { connect } from 'react-redux';

import Nodes from '../components/nodes';
import {
	nodesWithPorts,
} from '../selectors/selectors';


const mapStateToProps = state => ({
  nodes: nodesWithPorts(state),
})

const NodesContainer = connect(
  mapStateToProps
)(Nodes);

export default NodesContainer;
