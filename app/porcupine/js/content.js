import React from 'react';
import Sidebar from './sidebar';
import Canvas from './canvas'
import $ from 'jquery';

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
  }; //end constructor

  addNewNode(node) {
    const net = this.state.net;
    net[`N${this.state.nextNodeId}`] = node;
    this.setState({
      net: net,
      nextNodeId: this.state.nextNodeId + 1
    });
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
  }

  render() {
    return (
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
      </div>
    );
  }
}

export default Content;
