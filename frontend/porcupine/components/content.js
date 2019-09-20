import React, {useEffect, useRef} from 'react';
import {StyleRoot} from 'radium';

import withDragDropContext from './withDragDropContext';
import CodeEditor from '../containers/codeEditor';
import Canvas from '../containers/canvas';
import ParameterPane from '../containers/parameterPane';
import Sidebar from '../containers/sidebar';
import Modals from '../containers/modals';
import {isGitHash} from '../utils';
import {loadGiraffeConfig} from '../utils/loadPorkFile';


function mount(props, canvas) {
  const {
    setUser,
    setRepository,
    setBranch,
    setCommit,
    setConfig,
    updateAuth,
  } = props;
  const {username, repository, branchOrCommit} = props.match.params;
  setUser(username);
  setRepository(repository);
  const string = branchOrCommit || 'master';
  const isCommit = isGitHash(branchOrCommit);
  setCommit(isCommit && string);
  setBranch(!isCommit && string);

  if (!username || !repository) {
    console.log('No username or repository provided');
    return;
  }

  async function loadConfig() {
    const repoContentUrl = `https://raw.githubusercontent.com/${username}/${
      repository}/${branchOrCommit || 'master'}`;
    const configuration = await loadGiraffeConfig(repoContentUrl);
    if (!configuration ||
      !configuration.tools ||
      (!configuration.tools.porcupine && !configuration.tools.workflow)
    ) {
      setConfig({});
      return;
    }

    const {porcupine, workflow} = configuration.tools;
    const porcupineConfig = porcupine || workflow;
    // This loads the canvas content only after the UI has first rendered

    setConfig(porcupineConfig);
    canvas &&
      canvas.current &&
      canvas.current.decoratedRef.current.load(porcupineConfig, repoContentUrl);
  }

  async function auth() {
    updateAuth(await (await fetch('/api/get_user')).json());
  }

  Promise.all([
    auth(),
    loadConfig(),
  ]);
}


const Content = (props) => {
  const canvas = useRef(null);
  useEffect(() => mount(props, canvas), [props.match, canvas]);

  return (
    <StyleRoot>
      <Modals />
      <Sidebar />
      <CodeEditor />
      <div>
        <Canvas ref={canvas} />
        <ParameterPane />
      </div>
    </StyleRoot>
  );
};

export default withDragDropContext(Content);
