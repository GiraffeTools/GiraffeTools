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
    if (id === this.props.constructedLink) {
      let startingPort = portFrom || portTo;
      // currently dragging a link

      $(el).off('click');
      el.appendChild(s);

      const that=this;
      $('#zoomContainer').on('click', function(e) {
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
        $('#zoomContainer').off('mousemove')
        $('#zoomContainer').off('click')
      })
      $('#zoomContainer').on('mousemove', function(e) {
        const x=e.pageX-xi
        const y=e.pageY-yi
      })


      // if click on valid port
      connecLink(id, portFrom, portTo);

      // else
      deleteLink(id);
    }
    console.log(portFrom);
    console.log(portTo);

    const startingPoint = {x: 4, y: 4};
    const endPoint = {x: 250, y: 125};

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
  portById: (id) => portById(state, id),
})

const mapDispatchToProps = dispatch => ({
  connectLink: (linkId, portFrom, portTo) => dispatch(connecLink(linkId, portFrom, portTo)),
  deleteLink: (linkId) => dispatch(deleteLink(linkId)),
});

export default Node = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link);
