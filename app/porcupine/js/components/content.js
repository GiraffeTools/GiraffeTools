import { v4 } from "uuid";
import React from "react";
import { StyleRoot } from "radium";
import { DragDropContext } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import { default as ItemPreview } from "./canvas/itemPreview";
import CodeEditor from "../containers/codeEditor";
import Canvas from "../containers/canvas";
import ParameterPane from "../containers/parameterPane";
import Sidebar from "../containers/sidebar";
import Modals from "../containers/modals";
import { isGitHash } from "../utils";
import styles from "../styles/content";

@DragDropContext(MultiBackend(HTML5toTouch))
class Content extends React.Component {
  // constructor(props) {
  // super(props);
  // this.state = {
  // snapToGridAfterDrop: false,
  // snapToGridWhileDragging: false
  // };
  // }

  async componentWillMount() {
    const { username, repository, branchOrCommit } = this.props.match.params;
    const {
      setUser,
      setRepository,
      setBranch,
      setCommit,
      updateAuth
    } = this.props;
    setUser(username);
    setRepository(repository);
    let string = branchOrCommit || "master";
    let isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);

    const response = await fetch("/api/get_user");
    updateAuth(await response.json());
  }

  render() {
    // const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state
    const { showSidebar, toggleSidebar } = this.props;
    return (
      <StyleRoot>
        <Sidebar />
        <a style={[styles.sidebarButton, styles.close]} onClick={toggleSidebar}>
          <label style={[showSidebar ? styles.close1 : styles.open1]} />
          <label style={[showSidebar ? styles.close2 : styles.open2]} />
        </a>
        <div style={[styles.main]}>
          <Canvas />
          <ParameterPane />
          <CodeEditor />
          <Modals />
        </div>
      </StyleRoot>
    );
  }
}

export default Content;
