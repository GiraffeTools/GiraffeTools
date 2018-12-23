import { v4 } from "uuid";
import React from "react";
import { StyleRoot } from "radium";
import { DragDropContext } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import { default as ItemPreview } from "../components/itemPreview";
import CodeEditorContainer from "../containers/codeEditorContainer";
import CanvasContainer from "../containers/canvasContainer";
import ParameterPaneContainer from "../containers/parameterPaneContainer";
import SidebarContainer from "../containers/sidebarContainer";
import ModalsContainer from "../containers/modalsContainer";
import { isGitHash } from "../utils";
import styles from '../styles/content';

@DragDropContext(MultiBackend(HTML5toTouch))
class Content extends React.Component {
  // constructor(props) {
  // super(props);
  // this.state = {
  // snapToGridAfterDrop: false,
  // snapToGridWhileDragging: false
  // };
  // }

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
    const { showSidebar, toggleSidebar } = this.props;
    return (
      <StyleRoot>
        <SidebarContainer />
        <a style={[styles.sidebarButton, styles.close]} onClick={toggleSidebar}>
          <label
            style={[showSidebar ? styles.close1 : styles.open1]}
          />
          <label
            style={[showSidebar ? styles.close2 : styles.open2]}
          />
        </a>
        <div style={[styles.main]}>
          <CanvasContainer />
          <ParameterPaneContainer />
          <CodeEditorContainer />
          <ModalsContainer />
        </div>
      </StyleRoot>
    );
  }
}

export default Content;
