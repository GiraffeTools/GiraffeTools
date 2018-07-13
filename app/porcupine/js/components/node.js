import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import ItemTypes from './itemTypes';
import Ports from '../containers/ports';
import {
	hoverNode,
	clickNode,
	updateNodePosition,
} from '../actions/index';


const boxSource = {
  beginDrag(props) {
		event.stopPropagation();
    return {
      key: props.id,
      type: props.type
    }
  },
  endDrag(props, monitor) {
   const item = monitor.getItem()
   // const dropResult = monitor.getDropResult()
   const offset = monitor.getDifferenceFromInitialOffset()
   if (item) {
		 props.updateNodePosition(item.key, {x: props.x + offset.x, y: props.y + offset.y} );
   }
  },
}

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.connectPort   = this.connectPort.bind(this);
    this.connect       = this.connect.bind(this);
  }

  click(event, nodeId) {
    const { clickNode } = this.props;
    clickNode(nodeId);
    event.stopPropagation();
  }

  hover(event, nodeId) {
    const { hoverNode } = this.props;
    hoverNode(nodeId);
    event.stopPropagation();
  }

  drag(event, nodeId) {
		// When zoomed in, dragging nodes is impossible, as it drags the view instead.
		// #TODO issue #73, figure this out.
		// console.log('drag function');
    event.stopPropagation();
  }

  connectPort(e, portKey) {
    e.stopPropagation()
    this.connect(e.target)
  }

  connect(el) {
    $(el).off('click')
    // TODO: make the following grab from https instead of http
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // l.setAttribute('d', 'M4 4 C ')
    el.appendChild(s);
    s.appendChild(l);
    const xi=s.getClientRects()[0].x;
    const yi=s.getClientRects()[0].y;
    l.setAttribute("x2", 4);
    l.setAttribute("y2", 4);
    const that=this;
    $('#zoomContainer').on('click', function(e) {
      if (e.target.classList[0]==="node__port--input") {
        let x, y
        ({x,y}=e.target.getClientRects()[0])
        x=x-xi+4
        y=y-yi+4
        if (x>0) {
          l.setAttribute("d", 'M4 4 C '+x/2+' 4, '+x/2+' '+y+', '+x+' '+y);
        } else {
          l.setAttribute("d", 'M4 4 C '+(-x/2)+' '+y/2+', '+(3*x/2)+' '+y/2+', '+x+' '+y);
        }
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
      if (x>0) {
        l.setAttribute("d", 'M4 4 C '+x/2+' 4, '+x/2+' '+y+', '+x+' '+y);
      } else {
        l.setAttribute("d", 'M4 4 C '+(-x/2)+' '+y/2+', '+(3*x/2)+' '+y/2+', '+x+' '+y);
      }
    })
    // this.props.addNewLink();
  }

  render() {
    const {
      id,
      name,
      x,
      y,
      colour,
			hoveredNode,
			selectedNode,
      ports,
      isDragging, connectDragSource, connectDragPreview } = this.props;
    // const visiblePorts = ports.filter(port => port.visible);
    // console.log(this.props);
    let content = (
      <div
				draggable="true"
        className={'node' + (id === selectedNode ? ' selected' : '') + (id === hoveredNode ? ' hover' : '')}
        style={{
          left:`${x}px`,
          top: `${y}px`,
          background: colour
        }}
        onClick     ={(event) => this.click(event, id)}
        onTouchEnd  ={(event) => this.click(event, id)}
        onMouseEnter={(event) => this.hover(event, id)}
        onMouseLeave={(event) => this.hover(event, null)}
				onDrag 			={(event) => this.drag (event, id)}
        data-tip='tooltip'
        data-for='getContent'
      >
        <div className="node__type">
          { name }
        </div>

        <Ports
          ports={ports}
        />
      </div>
    )

    content = connectDragSource(content);
    // content = connectDragPreview(content);
    return content;
  }
}

Node.propTypes = {
  name:   PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
  x:      PropTypes.number.isRequired,
  y:      PropTypes.number.isRequired,
  class:  PropTypes.string,
  // connectDragSource: PropTypes.func.isRequired,
  // connectDragPreview: PropTypes.func.isRequired,
  // isDragging: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
	hoveredNode: state.scene.hoveredNode,
	selectedNode: state.scene.selectedNode,
})

const mapDispatchToProps = dispatch => ({
	hoverNode: (nodeId) => dispatch(hoverNode(nodeId)),
  clickNode: (nodeId) => dispatch(clickNode(nodeId)),
	updateNodePosition: (nodeId, offset) => dispatch(updateNodePosition(nodeId, offset)),
});


Node = DragSource(ItemTypes.Node, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
//   connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(Node)

export default Node = connect(
	mapStateToProps,
	mapDispatchToProps
)(Node);
