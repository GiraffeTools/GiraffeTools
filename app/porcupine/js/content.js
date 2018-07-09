import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux';
import $ from 'jquery';

import { default as ItemPreview } from './itemPreview';
import Canvas from './canvas';
import ParameterPane from './containers/parameterPane';
import Sidebar from './containers/sidebar';
import Tooltip from './containers/tooltip';
import zoomFunctions from './zoomFunctions';


require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.loadFromJson       = this.loadFromJson.bind(this);
    this.modifyNodeParams   = this.modifyNodeParams.bind(this);
    this.modifyNodePos      = this.modifyNodePos.bind(this);
    this.deleteNode         = this.deleteNode.bind(this);
  };

  componentWillMount() {
    $.getJSON(jsonFile, function(result) {
      this.loadFromJson(result);
    }.bind(this));
  }

  loadFromJson(json) {
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
    return (
      <DragDropContextProvider backend={ Modernizr.touchevents ? TouchBackend : HTML5Backend }>
        <div id="parent">
          <Sidebar />
          <div id="main" className={(this.props.showSidebar ? "withSidebar" : "")}>
            <Canvas />
            <ParameterPane />
            <Tooltip />
          </div>
          { Modernizr.touchevents && <ItemPreview key="__preview" name="Item" /> }
        </div>
      </DragDropContextProvider>
    );
  }
}


const mapStateToProps = state => ({
  showSidebar: state.sidebar.showSidebar
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
