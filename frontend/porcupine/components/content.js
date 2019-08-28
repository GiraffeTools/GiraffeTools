import React from 'react';
import {StyleRoot} from 'radium';

import withDragDropContext from './withDragDropContext';
import CodeEditor from '../containers/codeEditor';
import Canvas from '../containers/canvas';
import ParameterPane from '../containers/parameterPane';
import Sidebar from '../containers/sidebar';
import Modals from '../containers/modals';
import {isGitHash} from '../utils';
import {loadGiraffeConfig} from '../utils/loadPorkFile';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  async componentDidMount() {
    const {
      setUser,
      setRepository,
      setBranch,
      setCommit,
      setConfig,
      updateAuth,
    } = this.props;
    const {username, repository, branchOrCommit} = this.props.match.params;
    setUser(username);
    setRepository(repository);
    const string = branchOrCommit || 'master';
    const isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && string);
    setBranch(!isCommit && string);

    const response = await fetch('/api/get_user');
    updateAuth(await response.json());

    if (!username || !repository) {
      console.log('No username or repository provided');
      return;
    }
    // #This loads the canvas content only after the UI has first rendered
    const repoContentUrl = `https://raw.githubusercontent.com/${username}/${
      repository}/${branchOrCommit || 'master'}`;
    const configuration = await loadGiraffeConfig(repoContentUrl);
    if (!configuration ||
      !configuration.tools ||
      !configuration.tools.porcupine) {
      setConfig({});
      return;
    }
    const porcupineConfig = configuration.tools.porcupine;
    setConfig(porcupineConfig);
    this.canvas &&
      this.canvas.decoratedRef &&
      this.canvas.decoratedRef.current &&
      this.canvas.decoratedRef.current.load(porcupineConfig, repoContentUrl);
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
