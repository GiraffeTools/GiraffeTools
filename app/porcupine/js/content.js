import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'
import { default as ItemPreview } from './itemPreview';
import Sidebar from './sidebar';
import Canvas from './canvas'
import nodes from '../static/assets/nipype.json';
// import zoomFunctions from './zoomFunctions';
import $ from 'jquery';

require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');



class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {},
      selectedNode: null,
      hoveredNode: null,
      nextNodeId: 0
    };

    this.addNewNode         = this.addNewNode.bind(this);
    this.changeSelectedNode = this.changeSelectedNode.bind(this);
    this.toggleSidebar      = this.toggleSidebar.bind(this);
    this.loadFromJson       = this.loadFromJson.bind(this);
  }; //end constructor

  componentWillMount() {
    $.getJSON(jsonFile, function(result) {
      this.loadFromJson(result);
    }.bind(this));
  }

  addNewNode(node) {
    const net = this.state.net;
    net[`N${this.state.nextNodeId}`] = node;
    this.setState({
      net: net,
      nextNodeId: this.state.nextNodeId + 1
    });
    // console.log("Node: " + node);
    // console.log("Net: " + net);
  }

  changeSelectedNode(nodeId) {
    const net = this.state.net;
    if (this.state.selectedNode) {
      net[this.state.selectedNode].info.class = '';
    }
    if (nodeId) {
      net[nodeId].info.class = 'selected';
    }
    this.setState({
      net,
      selectedNode: nodeId
    });
  }

  toggleSidebar() {
    $('#sidebar').toggleClass('visible');
    $('.sidebar-button').toggleClass('close');
    $('#main').toggleClass('withSidebar');
  }

  loadFromJson(json) {
    this.setState({
      net: {},
      selectedNode: null,
      hoveredNode: null,
      nextNodeId: 0,
      error: []
    });
    const canvas = document.getElementById('jsplumbContainer');
    const zoom = instance.getZoom();

    // load nodes
    json['nodes'].forEach(node => {
      let category = node['category'].splice(1);
      let name = node.title.name;
      let currentNodes = nodes;
      category.forEach(function (c) {
        currentNodes = currentNodes['categories'][c];
      })
      const newNode = currentNodes.nodes[name];
      newNode.colour = currentNodes.colour;
      newNode.info = { category, name };
      newNode.state = {
        //This translation definitely needs to be fixed
        x: (node['position'][0] - canvas.x)/zoom - 45 + 1000,
        y: (node['position'][1] - canvas.y)/zoom - 25 + 400,
        class: ''
      };
      newNode.links = { input: [], output: [] };

      this.addNewNode(newNode);
    });

    // load links
    json['links'].forEach(link => {

    });
  }

  render() {
    return (
    <DragDropContextProvider backend={ Modernizr.touchevents ? TouchBackend : HTML5Backend }>
      <div id="parent">
        <a className="sidebar-button" onClick={this.toggleSidebar}></a>
        <Sidebar/>
        <div id="main">
          <Canvas
            net                 = {this.state.net}
            nextNodeId          = {this.state.nextNodeId}
            addNewNode          = {this.addNewNode}
            changeSelectedNode  = {this.changeSelectedNode}
          />
          {/* SetParams */}
          {/* Tooltip */}
          {/* Modal */}
        </div>
        { Modernizr.touchevents && <ItemPreview key="__preview" name="Item" /> }
      </div>
    </DragDropContextProvider>
    );
  }
}

export default Content;
