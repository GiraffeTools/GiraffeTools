import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import {
  addLink,
  startLink,
  updatePort,
} from '../actions/index';


class Port extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef  = React.createRef();
    this.outputRef = React.createRef();
    this.props.setPortRefs(props.id, this.inputRef, this.outputRef);
  }

  createLink(e, type) {
    // if there is no link under construction, create one:
    if (!this.props.linkInConstruction) {
      this.props.startLink({
        port: this.props.id,
        startingAt: type,
      });
      return;
    }

    // otherwise:
    const { linkInConstruction } = this.props;
    // #TODO move check to if (isValidConnection())
    // #TODO check if not circular
    if (type !== linkInConstruction.startingAt && this.props.id !== linkInConstruction.port) {
      this.props.addLink({
        id: v4(),
        portFrom: (type === 'output' ? this.props.id : linkInConstruction.port),
        portTo:   (type === 'input'  ? this.props.id : linkInConstruction.port),
      });
    }
  }

  render() {
    const {
      name,
      isInput,
      isOutput,
      id,
      linkInConstruction,
    } = this.props;
    const inputClicked  = (linkInConstruction && linkInConstruction.port === id && linkInConstruction.startingAt === 'input')  ? ' port-clicked' : '';
    const outputClicked = (linkInConstruction && linkInConstruction.port === id && linkInConstruction.startingAt === 'output') ? ' port-clicked' : '';
    const inputPort  = isInput  ? <span ref={this.inputRef}  id={"input-"  + id} className={'node__port--input'  + inputClicked } onClick={(event) => this.createLink(event, 'input' )}/> : '';
    const outputPort = isOutput ? <span ref={this.outputRef} id={"output-" + id} className={'node__port--output' + outputClicked} onClick={(event) => this.createLink(event, 'output')}/> : '';

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
	linkInConstruction: state.scene.linkInConstruction,
})

const mapDispatchToProps = dispatch => ({
	addLink: (props) => dispatch(addLink(props)),
  startLink: (props) => dispatch(startLink(props)),
  setPortRefs: (portId, inputPortRef, outputPortRef) => dispatch(updatePort(portId, { inputPortRef, outputPortRef } )),
});

export default Port = connect(
	mapStateToProps,
	mapDispatchToProps
)(Port);
