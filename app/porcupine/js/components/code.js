import PropTypes from 'prop-types';
import React from 'react';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import python from 'react-syntax-highlighter/languages/hljs/python';
import tomorrow from 'react-syntax-highlighter/styles/hljs/tomorrow-night-bright';

import NipypeCode from '../utils/codeGenerators/nipype';


registerLanguage('python', python);

class Code extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { nodes, links } = this.props;

    let code = '';
    switch (this.props.language) {
      case 'Nipype':
        code = NipypeCode(nodes);
        break;
      case 'Docker':
        break;
      default:
        code = NipypeCode(nodes);
        break;
    }

    return (
      <SyntaxHighlighter
				language='python'
				style={tomorrow}
			>
				{code}
			</SyntaxHighlighter>
    );
  }
}

export default Code;
