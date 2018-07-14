import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  createLink,
} from '../actions/index';


class Port extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      isInput,
      isOutput,
    } = this.props;

    let inputPort = '';
    let outputPort = '';
    if (isInput) {
      inputPort = <span className='node__port--input' onClick={(event) => this.props.createLink(event)}/>
    }
    if (isOutput) {
      outputPort = <span className='node__port--output' onClick={(event) => this.props.createLink(event)}/>
    }


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
	createLink: () => dispatch(createLink()),
});

export default Port = connect(
	mapStateToProps,
	mapDispatchToProps
)(Port);
