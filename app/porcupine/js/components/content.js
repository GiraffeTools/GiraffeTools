import { v4 } from "uuid";
import React from "react";
import { DragDropContext } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import { default as ItemPreview } from "../components/itemPreview";
import CodeEditorContainer from "../containers/codeEditorContainer";
import CanvasContainer from "../containers/canvasContainer";
import ParameterPaneContainer from "../containers/parameterPaneContainer";
import SidebarContainer from "../containers/sidebarContainer";
import Tooltip from "./tooltip";
import ModalsContainer from "../containers/modalsContainer";
import { isGitHash } from "../utils";

@DragDropContext(MultiBackend(HTML5toTouch))
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // snapToGridAfterDrop: false,
      // snapToGridWhileDragging: false
    };
  }

  componentWillMount() {
    const { username, repository, branchOrCommit } = this.props.match.params;
    const { setUser, setRepository, setBranch, setCommit } = this.props;
    setUser(username);
    setRepository(repository);
    let string = branchOrCommit || "master";
    let isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);
  }

  render() {
    // const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state
    const { hoveredNode, showSidebar, toggleSidebar } = this.props;

    return (
      <div id="parent">
        <SidebarContainer />
        <a
          className={"sidebar-button" + (showSidebar ? " close" : "")}
          onClick={() => toggleSidebar()}
        />
        <div id="main">
          <CanvasContainer />
          <ParameterPaneContainer />
          <Tooltip hoveredNode={hoveredNode} />
          <CodeEditorContainer />
          <ModalsContainer />
        </div>
      </div>
    );
  }
}

export default Content;
