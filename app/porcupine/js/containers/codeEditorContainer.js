import { connect } from 'react-redux';

import CodeEditor from '../components/codeEditor';
import {
  toggleCodeEditor,
} from '../actions';
import {
	nodesWithPorts,
	linksWithPortsAndNodes,
} from '../selectors/selectors';

const mapStateToProps = state => ({
  showCodeEditor: state.ui.showCodeEditor,
	nodes: nodesWithPorts(state),
  links: linksWithPortsAndNodes(state),
})

const mapDispatchToProps = dispatch => ({
  toggleCodeEditor: () => dispatch(toggleCodeEditor()),
});

const CodeEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditor);

export default CodeEditorContainer;
