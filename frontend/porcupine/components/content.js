import React from "react";
import { StyleRoot } from "radium";

import withDragDropContext from "./withDragDropContext";
import CodeEditor from "../containers/codeEditor";
import Canvas from "../containers/canvas";
import ParameterPane from "../containers/parameterPane";
import Sidebar from "../containers/sidebar";
import Modals from "../containers/modals";
import { isGitHash } from "../utils";
import styles from "../styles/content";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  async componentDidMount() {
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
    const string = branchOrCommit || "master";
    const isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);

    const response = await fetch("/api/get_user");
    updateAuth(await response.json());
    // #TODO write a comment about what this line does:
    this.canvas.decoratedRef.current.load();
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
          <Canvas ref={canvas => (this.canvas = canvas)} />
          <ParameterPane />
          <CodeEditor />
          <Modals />
        </div>
      </StyleRoot>
    );
  }
}

export default withDragDropContext(Content);
