import React from 'react';
import {StyleRoot} from 'radium';

import withDragDropContext from './withDragDropContext';
import CodeEditor from '../containers/codeEditor';
import Canvas from '../containers/canvas';
import ParameterPane from '../containers/parameterPane';
import Sidebar from '../containers/sidebar';
import Modals from '../containers/modals';
import {isGitHash} from '../utils';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  async componentDidMount() {
    const {username, repository, branchOrCommit} = this.props.match.params;
    const {
      setUser,
      setRepository,
      setBranch,
      setCommit,
      updateAuth,
    } = this.props;
    setUser(username);
    setRepository(repository);
    const string = branchOrCommit || 'master';
    const isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);

    const response = await fetch('/api/get_user');
    updateAuth(await response.json());
    // #TODO write a comment about what this line does:
    this.canvas.decoratedRef.current.load();
  }

  render() {
    // const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state
    return (
      <StyleRoot>
        <Modals />
        <Sidebar />
        <div>
          <Canvas ref={(canvas) => (this.canvas = canvas)} />
          <ParameterPane />
          <CodeEditor />
        </div>
      </StyleRoot>
    );
  }
}

export default withDragDropContext(Content);
