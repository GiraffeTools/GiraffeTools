
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { dark } from 'react-syntax-highlighter/styles/prism';

import NipypeCode from './codeGenerators/nipype';
import {
	nodesWithPorts,
	links,
} from '../selectors/selectors';

class Code extends React.Component {
  constructor(props) {
    super(props);
    const initialCodeString = '';

    this.state = {
      style: {dark},
      code: initialCodeString,
      showLineNumbers: false,
      width:  window.innerWidth,
      height: window.innerHeight
    }
  }

  render() {
    const { nodes, links } = this.props;

    let code = '';
    switch (this.props.language) {
      case 'Nipype':
        code = <NipypeCode
                 nodes={nodes}
               />;
        break;
      case 'Docker':
        break;
      default:
        code = <NipypeCode />
        break;
    }

    return (
      <SyntaxHighlighter
        customStyle={{ height: "100vh" }}
        style={this.state.style}
        showLineNumbers={this.state.showLineNumbers}
        codeTagProps={{ style: { height: "100vh" }}}
      >
        {code}
      </SyntaxHighlighter>
    );
  }
}

const mapStateToProps = state => ({
	nodes: nodesWithPorts(state),
  links: links(state),
})

const mapDispatchToProps = dispatch => ({
});

export default Node = connect(
	mapStateToProps,
	mapDispatchToProps
)(Code);
