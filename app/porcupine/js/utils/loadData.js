import React from "react";
import { load as loadYaml} from 'yaml-js';

import {
  addNode,
  addLink,
  clearDatabase,
  setUser,
  setRepository,
  repositionPorts,
  updateLoadingPercent
} from "../actions";
import { loadPorkFile } from "./loadPorkFile";

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.loadFromJson = this.loadFromJson.bind(this);
    this.setPercent = this.setPercent.bind(this);
    this.state = {
      configFile: null
    };
  }

  setPercent(percent) {
    if (percent >= 100) {
      updateLoadingPercent(99.9);
      // Always leave percent at -1
      this.timeout = setTimeout(() => {
        updateLoadingPercent(-1);
      }, 400);
    } else {
      updateLoadingPercent(percent);
    }
  }

  loadFromJson(json) {
    this.setPercent(10); // Loading started!
    // const { addNode, addLink, clearDatabase } = this.props;
    //pass by reference and fill them in the load functions
    let nodes = [];
    let links = [];
    try {
      loadPorkFile(json, nodes, links, this.setPercent);
    } catch (err) {
      console.log(
        "Error reading Porcupine Config file! Either data is missing or format is incorrect"
      );
      this.setPercent(-1);
    }
    clearDatabase();
    try {
      nodes.forEach(node => {
        addNode(node);
        repositionPorts(node);
      });
      links.forEach(link => {
        addLink(link);
      });
    } catch (err) {
      console.log(
        "Error while adding Link or Node to Canvas, Check Porcupine Config file "
      );
    }
  }

  componentWillMount() {
    const { username, repository } = this.props.match.params;
    // const { setUser, setRepository } = this.props;
    const baseName = `https://raw.githubusercontent.com/${username}/${repository}/master`;
    const configFile = `${baseName}/GIRAFFE.yml`;
    fetch(configFile)
      .then(result => result.body.getReader())
      .then(reader => {
        reader.read().then( ({ done, value }) => {
          const configuration = loadYaml(new TextDecoder("utf-8").decode(value));
          const porcupineFile = `${baseName}/${configuration.tools.porcupine.file[0]}`;

          fetch(porcupineFile)
            .then(result => result.json())
            .then(data => {
              this.loadFromJson(data);
              console.log("Porcupine Config file loaded from URL");
            })
            .catch(error => {
              console.log("Cannot load Porcupine Config file");
              this.setPercent(-1);
            });
        })
      })
      .catch();
  }

  render() {
    return <div />
  }
}

export default LoadData;
