import { connect } from "react-redux";

import CodeEditor from "../components/codeEditor";
import { toggleCodeEditor, setActiveTab } from "../actions";
import {
  nodesWithParameters,
  linksWithPortsAndNodes
} from "../selectors/selectors";

const mapStateToProps = state => ({
  showCodeEditor: state.ui.showCodeEditor,
  activeTab: state.ui.activeTab,
  nodes: nodesWithParameters(state),
  links: linksWithPortsAndNodes(state),
  showSidebar: state.ui.showSidebar
});

const mapDispatchToProps = dispatch => ({
  toggleCodeEditor: () => dispatch(toggleCodeEditor()),
  setActiveTab: tab => dispatch(setActiveTab(tab))
});

const CodeEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditor);

export default CodeEditorContainer;
