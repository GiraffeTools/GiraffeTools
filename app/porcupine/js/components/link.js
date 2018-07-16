import PropTypes from 'prop-types';
import React from 'react';
import { PathLine } from 'react-svg-pathline';
import { connect } from 'react-redux';

import {
  deleteLink,
} from '../actions/index';
import {
  portById,
} from '../selectors/selectors';


class Link extends React.Component {
  constructor(props) {
    super(props);
    this.connectPort   = this.connectPort.bind(this);
    this.connect       = this.connect.bind(this);
  }

  connectPort(e, portKey) {
    e.stopPropagation()
    this.connect(e.target)
  }

  connect(el) {

  }

  render() {
    const  { id, portFrom, portTo } = this.props;

    let startingPoint = {x: 0, y: 0};
    let endPoint      = {x: 0, y: 0};


    // #TODO Ouch, using jquery here. Let's fix this to the React way
    let startingPort = $(`#output-${portFrom.id}`);
    let endPort      = $(`#input-${portTo.id}`);

    // #TODO fix position, relative to what?
    startingPoint.x = startingPort.offset().left - 250;
    startingPoint.y = startingPort.offset().top - 55;
    endPoint.x = endPort.offset().left - 250;
    endPoint.y = endPort.offset().top - 55;

    return (
      <svg>
        <PathLine
          points={[startingPoint,
                  // #TODO Add intermediate points to make the connection smoother
                  {x: (startingPoint.x + endPoint.x) / 2, y: startingPoint.y},
                  {x: (startingPoint.x + endPoint.x) / 2, y: endPoint.y},
                  endPoint]}
          stroke="red"
          strokeWidth="2"
          fill="none"
          r={10}
        />
      </svg>
    )
  }
}

const mapStateToProps = state => ({
	linkInConstruction: state.scene.linkInConstruction,
  mouseState: state.scene.mouseState,
})

const mapDispatchToProps = dispatch => ({
  connectLink: (linkId, portFrom, portTo) => dispatch(connecLink(linkId, portFrom, portTo)),
  deleteLink: (linkId) => dispatch(deleteLink(linkId)),
});

export default Node = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link);
