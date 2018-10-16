import { v4 } from "uuid";
import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5TouchBackend from "react-dnd-html5-touch-backend";
import Modernizr from "browsernizr";

import { default as ItemPreview } from "../components/itemPreview";
import CodeEditorContainer from "../containers/codeEditorContainer";
import CanvasContainer from "../containers/canvasContainer";
import ParameterPaneContainer from "../containers/parameterPaneContainer";
import Sidebar from "./sidebar";
import Tooltip from "./tooltip";

@DragDropContext(HTML5TouchBackend)
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snapToGridAfterDrop: false,
      snapToGridWhileDragging: false
    };
  }

  render() {
    // const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state
    const { hoveredNode, showSidebar, toggleSidebar } = this.props;

    return (
      <div id="parent">
        <Sidebar showSidebar={showSidebar} />
        <a
          className={"sidebar-button" + (showSidebar ? " close" : "")}
          onClick={() => toggleSidebar()}
        />
        <div id="main">
          <CanvasContainer />
          <ParameterPaneContainer />
          <Tooltip hoveredNode={hoveredNode} />
          <CodeEditorContainer />
        </div>
      </div>
    );
  }
}

export default Content;
