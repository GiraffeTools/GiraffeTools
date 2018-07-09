import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'
import $ from 'jquery';

import { default as ItemPreview } from './itemPreview';
import Sidebar from './containers/sidebar';
import Canvas from './canvas';
import nodes from '../static/assets/nipype.json';
import ParameterPane from './parameterPane';
import zoomFunctions from './zoomFunctions';
import Tooltip from './tooltip';


require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {},
      nextNodeId: 0
    };
    this.addNewLink         = this.addNewLink.bind(this);
    this.toggleSidebar      = this.toggleSidebar.bind(this);
    this.loadFromJson       = this.loadFromJson.bind(this);
    this.modifyNodeParams   = this.modifyNodeParams.bind(this);
    this.modifyNodePos      = this.modifyNodePos.bind(this);
    this.deleteNode         = this.deleteNode.bind(this);
  }; //end constructor

  componentWillMount() {
    $.getJSON(jsonFile, function(result) {
      this.loadFromJson(result);
    }.bind(this));
  }

  addNewLink(link) {
    const ports = this.state.ports;
    net[`L${this.state.nextLinkId}`] = link;
    this.setState({
      net: net,
      nextLinkId: this.state.nextLinkId + 1
    });
  }

  toggleSidebar() {
    $('#sidebar').toggleClass('visible');
    $('.sidebar-button').toggleClass('close');
    $('.header').toggleClass('navbar-open');
    $('#main').toggleClass('withSidebar');
  }

  loadFromJson(json) {
    this.setState({
      net: {},
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
        x: node['position'][0],
        y: node['position'][1],
        class: ''
      };
      // newNode.links = { input: [], output: [] };

    });
    zoomFunctions().onLoaded();

    // load links
    json['links'].forEach(link => {

    });
  }

  modifyNodeParams(node, nodeId = this.state.selectedNode) {
    const net = this.state.net;
    net[nodeId] = node;
    this.setState({ net });
  }
  modifyNodePos(node, nodeId = this.state.selectedNode) {
    const net = this.state.net;
    net[nodeId] = node;
    this.setState({ net });
  }

  deleteNode(nodeId) {
    const net = this.state.net;
    delete net[nodeId];
    this.setState({
      net: net,
      selectedNode: null
    });
  }

  render() {
    let showSidebar = true;
    return (
    <DragDropContextProvider backend={ Modernizr.touchevents ? TouchBackend : HTML5Backend }>
      <div id="parent">
        <Sidebar />
        <div id="main">
          <Canvas
            net                 = {this.state.net}
            ports               = {this.state.ports}
            nextNodeId          = {this.state.nextNodeId}
            addNewLink          = {this.addNewLink}
            modifyNode          = {this.modifyNodePos}
          />
          <ParameterPane
            net                 = {this.state.net}
            selectedNode        = {this.state.selectedNode}
            deleteNode          = {this.deleteNode}
            modifyNode          = {this.modifyNodeParams}
          />
          <Tooltip
            id={'tooltip_text'}
            // net={this.state.net}
          />
          {/* Modal */}
        </div>
        { Modernizr.touchevents && <ItemPreview key="__preview" name="Item" /> }
      </div>
    </DragDropContextProvider>
    );
  }
}

export default Content;
