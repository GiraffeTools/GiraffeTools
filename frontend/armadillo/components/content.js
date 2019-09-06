import React from 'react';
import Radium from 'radium';
import {load as loadYaml} from 'yaml-js';

import AugmentedRealityScene from './augmentedRealityScene';
import MarkerWindow from './markerWindow';
import {isGitHash} from '../utils';

import 'aframe';
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: null,
      aframeLoaded: false,
    };
  }

  // eslint-disable-next-line
  async UNSAFE_componentWillMount() {
    const script = document.createElement('script');
    script.src = '/static/js/aframe-ar.js';
    script.async = false;
    document.head.appendChild(script);

    const checkAFrame = async () => {
      if (window.AFRAME !== undefined) {
        this.setState({aframeLoaded: true});
        clearInterval(this.interval);
      }
    };
    this.interval = setInterval(checkAFrame, 1000);

    const {username, repository, branchOrCommit} = this.props.match.params;
    const {setUser, setRepository, setBranch, setCommit} = this.props;
    setUser(username);
    setRepository(repository);
    const identifierString = branchOrCommit || 'master';
    const isCommit = isGitHash(branchOrCommit);
    setCommit(isCommit && identifierString);
    setBranch(!isCommit && identifierString);

    const baseName = `https://raw.githubusercontent.com/${username}/${repository}/${identifierString}`;
    const configFile = `${baseName}/GIRAFFE.yml`;

    const configuration = await fetch(configFile);
    if (!configuration.ok) {
      console.log('GiraffeTools configuration file cannot be loaded');
      return;
    }
    const yamlData = loadYaml(await configuration.text());
    const armadilloFile = yamlData.tools.armadillo.neurovault[0];
    this.setState({
      imageId: armadilloFile,
    });
  }

  render() {
    const {username, repository} = this.props.match.params;
    const {imageId, aframeLoaded} = this.state;

    return (
      <div>
        <MarkerWindow
          imageId={imageId}
          user={username}
          repository={repository}
        />
        {imageId &&
          aframeLoaded && (
          <div id="camdiv">
            <AugmentedRealityScene imageId={imageId} />
          </div>
        )}
      </div>
    );
  }
}

export default Radium(Content);
