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
      <div className={'codeWindow' + (this.props.showCodeEditor ? '-closed' : '')}>
        <div className={'codeButton fas ' + (this.props.showCodeEditor ? 'fa-angle-down' : 'fa-angle-up')} onClick={() => this.props.toggleCodeEditor()}>
        </div>
        {/* #TODO Make this a tab editor */}
        <div className="codeEditor">
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
