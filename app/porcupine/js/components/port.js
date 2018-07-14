import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import {
  addLink,
} from '../actions/index';


class Port extends React.Component {
  constructor(props) {
    super(props);
  }

  createLink(e, type) {
    this.props.addLink({
      linkId: v4(),
      portFrom: (type === 'input'  ? this.props.id : null),
      portTo:   (type === 'output' ? this.props.id : null),
    })
  }

  render() {
    const {
      name,
      isInput,
      isOutput,
    } = this.props;

    const inputPort  = isInput  ? <span className='node__port--input'  onClick={(event) => this.createLink(event, 'input' )}/> : '';
    const outputPort = isOutput ? <span className='node__port--output' onClick={(event) => this.createLink(event, 'output')}/> : '';

    return (
      <li>
        <div className='node__port'>
          {name}
          {inputPort}
          {outputPort}
        </div>
      </li>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	addLink: (props) => dispatch(addLink(props)),
});

export default Port = connect(
	mapStateToProps,
	mapDispatchToProps
)(Port);
