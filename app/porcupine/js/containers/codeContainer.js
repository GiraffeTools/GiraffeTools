import { connect } from 'react-redux';

import Code from '../components/code';
import {
	nodesWithPorts,
	links,
} from '../selectors/selectors';

const mapStateToProps = state => ({
	nodes: nodesWithPorts(state),
  links: links(state),
})

const CodeContainer = connect(
  mapStateToProps
)(Code);

export default CodeContainer;
