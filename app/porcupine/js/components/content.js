import { v4 } from 'node-uuid';
import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'

import { default as ItemPreview } from '../components/itemPreview';
import CodeEditorContainer from '../containers/codeEditorContainer';
import CanvasContainer from '../containers/canvasContainer';
import ParameterPaneContainer from '../containers/parameterPaneContainer';
import Sidebar from './sidebar';
import Tooltip from './tooltip';


require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.modifyNodePos      = this.modifyNodePos.bind(this);
  };

  modifyNodePos(node, nodeId = this.state.selectedNode) {
    const net = this.state.net;
    net[nodeId] = node;
    this.setState({ net });
  }

  render() {
    const {
      hoveredNode,
      showSidebar,
      toggleSidebar,
    } = this.props;

    return (
      <DragDropContextProvider backend={ Modernizr.touchevents ? TouchBackend : HTML5Backend }>
        <div id="parent">
          <a className={"sidebar-button" + (showSidebar ? "" : " close")} onClick={() => toggleSidebar()}></a>
          <Sidebar
            showSidebar={showSidebar}
          />
          <div id="main" className={(showSidebar ? "withSidebar" : "")}>
            <CanvasContainer />
            <ParameterPaneContainer />
            <Tooltip
              hoveredNode={hoveredNode}
            />
   				  <CodeEditorContainer />
          </div>
          { Modernizr.touchevents && <ItemPreview key="__preview" name="Item" /> }
        </div>
      </DragDropContextProvider>
    );
  }
}

export default Content;
