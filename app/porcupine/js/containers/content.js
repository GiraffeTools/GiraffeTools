import { v4 } from 'node-uuid';
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
import {
  addNode,
  addLink,
  clearDatabase,
} from '../actions/index';
import nodeData from '../../static/assets/nipype.json';


require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.loadFromJson       = this.loadFromJson.bind(this);
    this.modifyNodePos      = this.modifyNodePos.bind(this);
  };

  componentWillMount() {
    $.getJSON(jsonFile, function(result) {
      this.loadFromJson(result);
    }.bind(this));
  }

  loadFromJson(json) {
    const { addNode, addLink, clearDatabase } = this.props;

    clearDatabase();
    // load nodes
    json['nodes'].forEach(node => {

      // This block is only for obtaining the colour:
      let category = node['category'].splice(1);
      let name = node.title.name;
      let currentNodes = nodeData;
      category.forEach(function (c) {
        currentNodes = currentNodes['categories'][c];
      })

      const newNode = {
        id: node.id || v4(),
        name: node.title.name || '',
        // HACK: get position right for example
        x: node['position'][0] + 1000,
        y: node['position'][1] + 400,
  			colour: currentNodes.colour || '#BBB',
  			web_url: node.web_url || '',
      };
      newNode.ports = node.ports.map(port => {
        const portId = port.input ? port.inputPort : port.outputPort;
        return {
          node: newNode.id,
          id: portId || v4(),
          name: port.name,
          input: port.input,
          output: port.output,
          visible: port.visible,
          editable: port.editable,
          // inputPortRef: port.inputPortRef,
          // outputPortRef: port.outputPortRef,
          value: port.value || '',  // #TODO insert proper default value
        }
      });
      addNode(newNode);
    });

    // load links
    json['links'].forEach(link => {
      const newLink = {
        id: v4(),
        portFrom: link.from,
        portTo: link.to,
      };
      addLink(newLink);
    });
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
  showSidebar: state.ui.showSidebar
})

const mapDispatchToProps = dispatch => ({
  addLink: (props) => dispatch(addLink(props)),
  addNode: (node) => dispatch(addNode(node)),
  clearDatabase: () => dispatch(clearDatabase()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
