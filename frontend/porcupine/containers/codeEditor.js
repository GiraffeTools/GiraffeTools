import { connect } from "react-redux";

import CodeEditor from "../components/codeEditor/codeEditor";
import { toggleCodeEditor, setActiveTab } from "../actions";
import {
  nodesWithParameters,
  linksWithPortsAndNodes,
  languageNames
} from "../selectors/selectors";

const mapStateToProps = state => ({
  activeTab: state.ui.activeTab,
  nodes: nodesWithParameters(state),
  links: linksWithPortsAndNodes(state),
  languages: languageNames(state),
  showSidebar: state.ui.showSidebar,
  grammars: state.grammars.grammars
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
