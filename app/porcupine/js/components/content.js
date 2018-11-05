import { v4 } from "uuid";
import React from "react";
import { DragDropContext } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import { default as ItemPreview } from "../components/itemPreview";
import CodeEditorContainer from "../containers/codeEditorContainer";
import CanvasContainer from "../containers/canvasContainer";
import ParameterPaneContainer from "../containers/parameterPaneContainer";
import Sidebar from "./sidebar";
import Tooltip from "./tooltip";
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
    const { setUser, setRepository, setBranch, setCommit, user } = this.props;
    setUser(username);
    setRepository(repository);
    let string = branchOrCommit || "master";
    let isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);
  }

  render() {
    // const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state
    const { hoveredNode, showSidebar, toggleSidebar, user } = this.props;

    return (
      <div id="parent">
        <Sidebar showSidebar={showSidebar} user={user} />
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
