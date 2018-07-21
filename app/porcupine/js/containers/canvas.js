import { v4 } from 'node-uuid';
import PropTypes from 'prop-types';
import React from 'react';
import { PinchView } from 'react-pinch-zoom-pan';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import ItemTypes from '../components/itemTypes';
import CodeEditor from '../components/codeEditor';
import Links from './links';
import MouseTracker from '../components/mouseTracker';
import Nodes from './nodes';
// import zoomFunctions from '../zoomFunctions';
import nodeData from '../../static/assets/nipype.json';
import {
	addNode,
	addPortToNode,
	clickScene,
} from '../actions/index';
import {
	nodes,
} from '../selectors/selectors';


const ZoomIn = () => {
	return (
		<div id='icon-plus' className="canvas-icon">
			<p>Press</p>
			<button className="btn btn-default text-center">
					<span aria-hidden="true">+</span>
			</button>
		</div>
	);
}

const ZoomOut = () => {
	return(
		<div id='icon-minus' className="canvas-icon">
			<p>Press</p>
			<button className="btn btn-default text-center">
					<span aria-hidden="true">-</span>
			</button>
		</div>
	);
}

const boxTarget = {
	drop(props, monitor, component) {
		component.drop(monitor.getItem(), monitor.getClientOffset())
		return { name: 'Canvas' }
	},
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.allowDrop            = this.allowDrop.bind(this);
    this.drop                 = this.drop.bind(this);
    this.clickCanvas          = this.clickCanvas.bind(this);
  }

  componentDidMount() {
		// #TODO remove/replace zoomFunctions in issue #73
		// setBoundingBox();
    // this.mouseState = zoomFunctions();
  }

  componentDidUpdate() {
    this.placeholder = false;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(item, offset) {
		const { addNode, addPortToNode } = this.props;

    this.placeholder = false;
		const rec = document.getElementById('main').getBoundingClientRect();
		// #TODO to be updated as part of #73:
		// const canvas = document.getElementById('jsplumbContainer');
    // const zoom = instance.getZoom();
    const zoom = 1;

    let category = item.element_type;
    let name = category.splice(-1)[0];
    let currentNodes = nodeData;
    category.forEach(function (c) {
      currentNodes = currentNodes['categories'][c];
    })
    const node = $.extend(true, {}, currentNodes.nodes[name]);
		node.ports ? node.ports : {};
		node.ports = node.ports.map(port => {
			// #TODO link to a proper default value
			return {...port, id: v4()}
		});

		const newNode = {
			id: v4(),
			name: name,
			// #TODO fix positioning of dropped node, issue #73
			// x: (offset.x - rec.left - canvas.x) / zoom - 45,
			// y: (offset.y - rec.top -  canvas.y) / zoom - 25,
			x: (offset.x - rec.left) / zoom - 45,
			y: (offset.y - rec.top) / zoom - 25,
			colour: currentNodes.colour,
			ports: node.ports,
			web_url: node.title.web_url || '',
		};

		addNode(newNode);
  }

  clickCanvas(event) {
		const { clickScene } = this.props;
		clickScene();
    event.preventDefault();
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

    return connectDropTarget(
      <div
        className="canvas"
        onDragOver={this.allowDrop}
        onClick={this.clickCanvas}
      >
        {/* {errors} */}
        {this.props.nodes.length == 0 ? (<h4 className="text-center" id="placeholder">Drag your nodes here!</h4>) : ''}
				{/* #TODO replace this container, issue #73 */}

				<PinchView>
					<div
						id="mainSurface"
					>
	          <Nodes />
						<Links />
					</div>
				</PinchView>

				<ZoomIn />
				<ZoomOut />

        {/*
				<div >
          {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>
         */}
				 <CodeEditor />
      </div>,
    );
  }
}

Canvas.propTypes = {
  // connectDropTarget:    PropTypes.func.isRequired,
  isOver: 		PropTypes.bool.isRequired,
  canDrop: 		PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	nodes: nodes(state),
})

const mapDispatchToProps = dispatch => ({
	addNode: (node) => dispatch(addNode(node)),
	addPortToNode: (port, nodeId) => dispatch(addPortToNode(port, nodeId)),
	clickScene: () => dispatch(clickScene()),
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
