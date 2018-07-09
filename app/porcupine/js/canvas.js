import { v4 } from 'node-uuid';
import PropTypes from 'prop-types';
import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import ItemTypes from './itemTypes';
import Link from './link';
import Nodes from './containers/nodes';
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
		this.clickOrDraggedNode   = false;
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

  drop(item, offset) {
		const { addNode, addPortToNode } = this.props;

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

		const newNode = {
			id: v4(),
			name: name,
			x: (offset.x - rec.left - canvas.x) / zoom - 45,
			y: (offset.y - rec.top -  canvas.y) / zoom - 25,
			colour: currentNodes.colour,
		};
		addNode(newNode);

		node.ports.map((port) => {
			port.id = v4();
			const newPort = {
				id: port.id,
				name: port.name,
				isInput: port.input,
				isOutput: port.output,
				isVisible: port.visible,
				isEditable: port.editable,
			};
			addPortToNode(newPort, newNode.id);
		});
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

    const { canDrop, isOver, connectDropTarget, nodes } = this.props;
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

    let placeholder = null;
    if (this.placeholder){
      placeholder = (<h4 className="text-center" id="placeholder">Drag your nodes here!</h4>);
    }



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
          <Nodes />
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
  // ports:                PropTypes.object.isRequired,
  // addNewNode:           PropTypes.func.isRequired,
  // changeSelectedNode:   PropTypes.func.isRequired,
  // changeHoveredNode:    PropTypes.func.isRequired,
  // connectDropTarget:    PropTypes.func.isRequired,
  isOver: 		PropTypes.bool.isRequired,
  canDrop: 		PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	addNode: (node) => dispatch(addNode(node)),
	addPortToNode: (port, nodeId) => dispatch(addPortToNode(port, nodeId)),
});

Canvas = DropTarget(ItemTypes.PaneElement, boxTarget, (connection, monitor) => ({
	connectDropTarget: connection.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(Canvas)

export default Canvas = connect(
	mapStateToProps,
	mapDispatchToProps
)(Canvas);
