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

    if (id === this.props.constructedLink) {
      // #TODO Ouch, using jquery here. Let's fix this to the React way
      let startingPort = '';
      if (portFrom) {
        startingPort = $(`#output-${portFrom.id}`);
      } else if (portTo) {
        startingPort = $(`#input-${portTo.id}`);
      }

      // #TODO fix position, relative to what?
      startingPoint.x = startingPort.position().left + startingPort.offset().left;
      startingPoint.y = startingPort.position().top  + startingPort.offset().top;

      // currently dragging a link
      // $(el).off('click');
      // el.appendChild(s);
      //
      // const that=this;
      $('#mainSurface').on('click', function(e) {
        console.log('test');
        if (e.target.classList[0]==="node__port--input") {
          let x, y
          ({x,y}=e.target.getClientRects()[0])
          $(el).on('click', (e)=>{
            e.stopPropagation()
            that.connect(el)
          })
        } else{
          el.removeChild(s)
          $(el).on('click', (e)=>{
            e.stopPropagation()
            that.connect(el)
          })
        }
        $('#mainSurface').off('mousemove')
        $('#mainSurface').off('click')
      })
      $('#mainSurface').on('mousemove', function(e) {
        console.log('test');
        const x=e.pageX-xi
        const y=e.pageY-yi
      })
      // // if click on valid port
      // connecLink(id, portFrom, portTo);
      // // else
      // deleteLink(id);
    }
    const mousePosition = this.props.mouseState.position;
    const endPoint = mousePosition;

    return (
      <svg>
        <PathLine
          points={[startingPoint,
                  // #TODO Add intermediate points to make the connection smoother
                  // {x:..., y: ...},
                  // {x:..., y: ...},
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
	constructedLink: state.scene.constructedLink,
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
