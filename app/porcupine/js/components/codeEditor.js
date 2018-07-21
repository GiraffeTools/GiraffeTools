import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Code from './code';
import {
  toggleCodeEditor,
} from '../actions/index';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="codeWindow">
        <div className={'codeButton' + (this.props.showCodeEditor ? '-closed' : '') + ' fas ' + (this.props.showCodeEditor ? 'fa-angle-up' : 'fa-angle-down')} onClick={() => this.props.toggleCodeEditor()}>
        </div>
        {/* #TODO Make this a tab editor */}
        <div className={'codeEditor' + (this.props.showCodeEditor ? '-closed' : '')}>
          <Code
            language='Nipype'
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showCodeEditor: state.ui.showCodeEditor,
})

const mapDispatchToProps = dispatch => ({
  toggleCodeEditor: () => dispatch(toggleCodeEditor()),
});

export default Node = connect(
	mapStateToProps,
	mapDispatchToProps
)(CodeEditor);
