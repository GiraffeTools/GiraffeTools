import PropTypes from 'prop-types';
import React from 'react';
import { DropTarget } from 'react-dnd';
import { v4 } from 'node-uuid';

import ItemTypes from './itemTypes';
import Node from './node';
import Link from './link';
import zoomFunctions from './zoomFunctions';
import nodeData from '../static/assets/nipype.json';
import {
	addNode,
	addPortToNode,
} from './actions/index';
import {
	nodeSelector,
	nodePortSelector,
} from './selectors/selectors';


const boxTarget = {
	drop(props, monitor, component) {
		component.drop(monitor.getItem(), monitor.getClientOffset())
		return { name: 'Canvas' }
	},
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.placeholder          = true;
    this.allowDrop            = this.allowDrop.bind(this);
    this.drop                 = this.drop.bind(this);
    this.clickCanvas          = this.clickCanvas.bind(this);
    this.clickOrDraggedNode   = false;
    this.clickNodeEvent       = this.clickNodeEvent.bind(this);
    this.hoverNodeEvent       = this.hoverNodeEvent.bind(this);
    this.leaveNodeEvent       = this.leaveNodeEvent.bind(this);
    this.clickOrDraggedNode   = false;
    this.updateNodePosition   = this.updateNodePosition.bind(this);
  }

  componentDidMount() {
    this.placeholder = false;
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		);
		// instance = jsPlumbReady();
    this.mouseState = zoomFunctions();
  }

	componentWillUnmount() {
		this.unsubscribe();
	}

  componentDidUpdate() {
    this.placeholder = false;
    // let a = jsPlumb.getSelector('.node');
    // instance.draggable(a,
    //   {
    //     drag: this.updateNodePosition.bind(this),
    //     grid: [8, 8]
    //   }
    // );
  }

  allowDrop(event) {
    event.preventDefault();
  }

  clickNodeEvent(event, nodeId) {
    if (this.clickOrDraggedNode === false && event.target.classList[0]!=="node__port--input") {
      this.props.changeSelectedNode(nodeId);
    } else if (this.clickOrDraggedNode === true) {
      this.clickOrDraggedNode = false;
    }
    event.stopPropagation();
  }

  hoverNodeEvent(event, nodeId) {
    this.props.changeHoveredNode(nodeId);
    event.stopPropagation();
  }

  leaveNodeEvent(event){
    this.props.changeHoveredNode(null);
    event.stopPropagation();
  }

  updateNodePosition(nodeId, offset) {
    if (!this.clickOrDraggedNode) {
      this.clickOrDraggedNode = true;
    }
    const node = this.props.net[nodeId];
    node.state.x += offset.x;
    node.state.y += offset.y;
    this.props.modifyNode(node, nodeId);
  }

  drop(item, offset) {
    this.placeholder = false;
		const rec = document.getElementById('zoomContainer').getBoundingClientRect();
		// #TODO to be removed as part of #73:
		const canvas = document.getElementById('jsplumbContainer');
    // const zoom = instance.getZoom();
    const zoom = 1;
    let category = item.element_type;
    let name = category.splice(-1)[0];
    let currentNodes = nodeData;
    category.forEach(function (c) {
      currentNodes = currentNodes['categories'][c];
    })
    const node = $.extend(true, {}, currentNodes.nodes[name]);
    node.colour = currentNodes.colour;
		node.id = v4();

		// #TODO to be extracted as action #72
		// addNode({
		// });
		const { store } = this.context;
		store.dispatch({
			type: 'ADD_NODE',
			payload: {
				id: node.id,
				name: name,
			  x: (offset.x - rec.left - canvas.x) / zoom - 45,
			  y: (offset.y - rec.top -  canvas.y) / zoom - 25,
			  colour: node.colour,
			},
		});

		// #TODO to be extracted as action #72
		node.ports.map((port) => {
			port.id = v4();
			store.dispatch({
				type: 'ADD_PORT',
				payload: {
					nodeId: node.id,
					id: port.id,
					name: port.name,
				  isInput: port.input,
				  isOutput: port.output,
				  isVisible: port.visible,
				  isEditable: port.editable,
				},
			});
			store.dispatch({
				type: 'ADD_PORT_TO_NODE',
				payload: {
					nodeId: node.id,
					port: port,
				},
			});
		});

		// #TODO to be removed and read from 'state' in #72:
    // this.props.addNewNode(node);
  }

	// #TODO updated in jsPlumb overhaul, issue #73
  clickCanvas(event) {
    this.placeholder = false;
    event.preventDefault();
    if (event.target.id === 'zoomContainer' && !this.mouseState.pan) {
      this.props.changeSelectedNode(null);
    }
    this.mouseState.pan = false;
    this.mouseState.click = false;
    event.stopPropagation();
  }

  render() {
    const props = this.props;


    const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

    // const nodes = [];
    const net = this.props.net;
    let placeholder = null;
    if (this.placeholder){
      placeholder = (<h4 className="text-center" id="placeholder">Drag your nodes here!</h4>);
    }

		{/* #TODO extract store with mapStateToProps, issue #72 */}
		const { store } = this.context;
		const nodes = nodeSelector(store.getState());

		const allnodes = nodes.map(node => {
			return (
				<Node
					key 		= {node.id}
          y       = {node.y}
          x       = {node.x}
          name    = {node.name}
          colour  = {node.colour}
					// #TODO insert the right ports here, issue #72
					// ports		= {ports}
          click   = {this.clickNodeEvent}
          hover   = {this.hoverNodeEvent}
          leave   = {this.leaveNodeEvent}
          dragged = {this.updateNodePosition}
        />
			);
		});

		{/*
		const links = linkSelector(store.getState());
		links.map(link => {
			return (
				<Link
        />
			);
		});
		*/}

    return connectDropTarget(
      <div
        className="canvas"
        id="zoomContainer"
        onDragOver={this.allowDrop}
        onClick={this.clickCanvas}
      >
        {/* {errors} */}
        {placeholder}
				{/* #TODO extract store with mapStateToProps, issue #72 */}
        <div
          id="jsplumbContainer"
          data-zoom="1"
          data-x="0"
          data-y="0"
        >
          { allnodes }
        </div>

        <div id='icon-plus' className="canvas-icon">
          <p>Press</p>
          <button className="btn btn-default text-center">
              <span aria-hidden="true">+</span>
          </button>
        </div>
        <div id='icon-minus' className="canvas-icon">
          <p>Press</p>
          <button className="btn btn-default text-center">
              <span aria-hidden="true">-</span>
          </button>
        </div>
        {/* <div style={{ ...style, backgroundColor }}>
          {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>
         */}
      </div>,
    );
  }
}
Canvas.contextTypes = {
	store: PropTypes.object
};

Canvas.propTypes = {
  placeholder:          PropTypes.bool,
  // net:                  PropTypes.object.isRequired,
  // ports:                PropTypes.object.isRequired,
  // addNewNode:           PropTypes.func.isRequired,
  changeSelectedNode:   PropTypes.func.isRequired,
  changeHoveredNode:    PropTypes.func.isRequired,
  connectDropTarget:    PropTypes.func.isRequired,
  isOver: 		PropTypes.bool.isRequired,
  canDrop: 		PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		propsNodes: nodes(nodes),
	}
}


export default DropTarget(ItemTypes.PaneElement, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(Canvas)
