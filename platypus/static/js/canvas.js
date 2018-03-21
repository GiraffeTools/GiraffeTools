import PropTypes from 'prop-types';
import React from 'react';
import Node from './node'
import jsPlumbReady from './jsplumb';
import zoomFunctions from './zoomFunctions';
import nodes from '../assets/nipype.JSON';
// import { getNodesByCategory } from './utilityFunctions'

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.placeholder          = true;
    this.allowDrop            = this.allowDrop.bind(this);
    this.drop                 = this.drop.bind(this);
    this.clickCanvas          = this.clickCanvas.bind(this);
    this.clickOrDraggedNode   = false;
    this.clickNodeEvent       = this.clickNodeEvent.bind(this);
    this.clickOrDraggedNode   = false;
  }

  componentDidMount() {
    this.placeholder = false;
    instance = jsPlumbReady();
    this.mouseState = zoomFunctions();
  }

  componentDidUpdate() {
    this.placeholder = false;
    console.log('A');
    let a = jsPlumb.getSelector('.node');
    console.log(a);
    console.log('B');
    instance.draggable(a,
      {
        drag: this.updateNodePosition.bind(this),
        grid: [8, 8]
      }
    );
  }

  allowDrop(event) {
    event.preventDefault();
  }

  clickNodeEvent(event, nodeId) {
    if (this.clickOrDraggedNode === false) {
      this.props.changeSelectedNode(nodeId);
    } else if (this.clickOrDraggedNode === true) {
      this.clickOrDraggedNode = false;
    }
    event.stopPropagation();
  }

  updateNodePosition(event) {
    if (!this.clickOrDraggedNode) {
      this.clickOrDraggedNode = 1;
    }
    const nodeId = event.el.id;
    const node = this.props.net[node];
    node.state.left = `${event.pos['0']}px`;
    node.state.top = `${event.pos['1']}px`;
    this.props.modifyNode(node, nodeId);
  }

  drop(event) {
    this.placeholder = false;
    event.preventDefault();
    const canvas = document.getElementById('jsplumbContainer');
    const zoom = instance.getZoom();

    let category = event.dataTransfer.getData('element_type').split(',');
    let name = category.splice(-1)[0];
    let currentNodes = nodes;
    category.forEach(function (c) {
      currentNodes = currentNodes['categories'][c];
    })
    const node = currentNodes.nodes[name];

    node.colour = currentNodes.colour;
    node.info = { category, name };
    node.state = {
      x: (event.clientX - event.target.getBoundingClientRect().left - canvas.x)/zoom - 45,
      y: (event.clientY - event.target.getBoundingClientRect().top -  canvas.y)/zoom - 25,
      class: ''
    };

    node.links = { input: [], output: [] };
    // node.ports = {};
    // Object.keys(data[type].params).forEach(j => {
    //   node.params[j] = [data[type].params[j].value, false];
    // });
    // node.params['endPoint'] = [data[type]['endpoint'], false];

    this.props.addNewNode(node);
  }

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
    const nodes = [];
    const net = this.props.net;
    let placeholder = null;
    if (this.placeholder){
      placeholder = (<h4 className="text-center" id="placeholder">Drag your nodes here!</h4>);
    }
    Object.keys(net).forEach(nodeId => {
      const node = net[nodeId];
      nodes.push(
        <Node
          key    = {nodeId}
          id     = {nodeId}
          y      = {node.state.y}
          x      = {node.state.x}
          type   = {node.info.name}
          colour = {node.colour}
          click  = {this.clickNodeEvent}
        />
      );
    })

    return (
      <div
        className="canvas"
        id="zoomContainer"
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        onClick={this.clickCanvas}
      >
        {/* {errors} */}
        {placeholder}
        <div
          id="jsplumbContainer"
          data-zoom="1"
          data-x="0"
          data-y="0"
        >
          {nodes}
        </div>
        {/*
        <div id='icon-plus' className="canvas-icon">
          <p>Press ]</p>
          <button className="btn btn-default text-center">
              <span className="glyphicon glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </div>
        <div id='icon-minus' className="canvas-icon">
          <p>Press [</p>
          <button className="btn btn-default text-center">
              <span className="glyphicon glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </div>
         */}
      </div>
    );
  }
}

Canvas.propTypes = {
  placeholder:          PropTypes.bool,
  net:                  PropTypes.object.isRequired,
  addNewNode:           PropTypes.func.isRequired,
  changeSelectedNode:   PropTypes.func.isRequired,
};

export default Canvas;
