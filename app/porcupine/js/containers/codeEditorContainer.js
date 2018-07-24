import { connect } from 'react-redux';

import CodeEditor from '../components/codeEditor';
import {
  toggleCodeEditor,
} from '../actions';


const mapStateToProps = state => ({
  showCodeEditor: state.ui.showCodeEditor,
})

const mapDispatchToProps = dispatch => ({
  toggleCodeEditor: () => dispatch(toggleCodeEditor()),
});

const CodeEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditor);

export default CodeEditorContainer;
