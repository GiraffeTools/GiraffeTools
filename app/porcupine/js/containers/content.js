import { v4 } from 'node-uuid';
import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux';
import $ from 'jquery';

import { default as ItemPreview } from '../components/itemPreview';
import CodeEditorContainer from './codeEditorContainer';
import Canvas from './canvas';
import ParameterPane from './parameterPane';
import Sidebar from './sidebar';
import Tooltip from './tooltip';
import {
  addNode,
  addLink,
  clearDatabase,
} from '../actions';
import nodeData from '../../static/assets/nipype.json';
import { loadPorkFile } from '../utils/loadPorkFile';


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
    const {
      addNode,
      addLink,
      clearDatabase
    } = this.props;
  //pass by reference and fill them in the load functions
    let nodes = [];
    let links = [];
    loadPorkFile(json, nodes, links);

    clearDatabase();
    nodes.forEach(node => {
      addNode(node);
    });
    links.forEach(link => {
      addLink(link);
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
   				  <CodeEditorContainer />
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
  addLink: (link) => dispatch(addLink(link)),
  addNode: (node) => dispatch(addNode(node)),
  clearDatabase: () => dispatch(clearDatabase()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
