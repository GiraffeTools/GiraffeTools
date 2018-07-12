import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux';
import $ from 'jquery';

import { default as ItemPreview } from '../components/itemPreview';
import Canvas from './canvas';
import ParameterPane from './parameterPane';
import Sidebar from './sidebar';
import Tooltip from './tooltip';
 // #TODO to be removed in #73
// import zoomFunctions from '../zoomFunctions';


require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.loadFromJson       = this.loadFromJson.bind(this);
    this.modifyNodeParams   = this.modifyNodeParams.bind(this);
    this.modifyNodePos      = this.modifyNodePos.bind(this);
  };

  componentWillMount() {
    $.getJSON(jsonFile, function(result) {
      this.loadFromJson(result);
    }.bind(this));
  }

  loadFromJson(json) {
    // #TODO to be updated in #73
    // const canvas = document.getElementById('jsplumbContainer');
    const canvas = document.getElementById('mainSurface');
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
    });
    // #TODO to be removed in #73
    // zoomFunctions().onLoaded();

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
