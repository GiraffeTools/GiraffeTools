import PropTypes from 'prop-types';
import React from 'react';

import CodeContainer from '../containers/codeContainer';


class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className={"codeWindow " + (this.props.showCodeEditor ? 'codeWindowClosed' : '')}>
        <div className={'codeButton fas ' + (this.props.showCodeEditor ? 'fa-angle-up' : 'fa-angle-down')} onClick={() => this.props.toggleCodeEditor()} />
        {/* #TODO Make this a tab editor */}
        <div className='codeEditor'>
          <CodeContainer
            language='Nipype'
          />
        </div>
      </div>
    );
  }
}

export default CodeEditor;
