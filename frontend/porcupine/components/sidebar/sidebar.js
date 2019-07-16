import React from "react";
import Radium from "radium";

import GithubIcon from "./githubIcon";
import ToolboxGroup from "./toolboxGroup";
import SearchBar from "./searchBar";
import styles from "../../styles/sidebar";
import { savePorkFile, initPorkFile } from "../../utils/savePorkFile";

import "../../scss/scrollbar.scss";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchBar = React.createRef();
    this.state = {
      matchedNodes: null,
      searchText: ""
    };
  }

  async componentDidMount() {
    const { addToolboxNodes } = this.props;
    const nodes = [
      "/static/Libraries/nipype/nipype_nodes.json"
      // "/static/Libraries/keras/keras_nodes.json"
    ];
    const toolboxes = nodes.map(async url => await (await fetch(url)).json());
    Promise.all(
      toolboxes.map(async nodes => addToolboxNodes((await nodes)["toolboxes"]))
    );
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    const {
      allNodes,
      showSidebar,
      project,
      openModal,
      showToolboxes
    } = this.props;
    const { matchedNodes } = this.state;

    const searching =
      this.searchBar.current &&
      this.searchBar.current.state.searchText &&
      this.searchBar.current.state.searchText.length;
    const currentNodes = searching ? matchedNodes : allNodes;
    const toolboxes = allNodes.map(toolbox => toolbox.name);

    return (
      <div style={[styles.sidebar, showSidebar && styles.sidebar.active]}>
        <div style={[styles.logoSidebar]}>
          <a href={`/github/${project.user}/${project.repository}`}>
            <img
              style={[styles.logo]}
              src={"/static/img/giraffetools_logo_notext.png"}
              className="img-responsive"
              alt="logo"
            />
          </a>
        </div>
        <div style={[styles.search]}>
          <h5 style={[styles.sidebarHeading]}>SEARCH</h5>
          <SearchBar
            ref={this.searchBar}
            toolboxes={allNodes}
            setSearchResults={results =>
              this.setState({ matchedNodes: results })
            }
          />
        </div>
        <div style={[styles.nodes]}>
          <h5 style={[styles.sidebarHeading]}>
            TOOLBOXES
            <a
              onClick={() =>
                openModal({
                  title: "Toolboxes",
                  type: "toggle_toolboxes",
                  onClose: () => {},
                  onConfirm: () => {}
                })
              }
            >
              <img style={[styles.gear]} src="/static/img/gear.svg" />
            </a>
          </h5>
        </div>
        <div style={[styles.nodeBox]} className="customScrollbar">
          <div
            style={[styles.panelGroup]}
            role="tablist"
            aria-multiselectable="true"
          >
            {currentNodes &&
              currentNodes.map((toolbox, index) => {
                if (!showToolboxes || !showToolboxes.includes(toolbox.name))
                  return null;
                return <ToolboxGroup key={index} toolbox={toolbox} />;
              })}
          </div>
        </div>
        <div style={[styles.actionsPanel]}>
          <h5 style={[styles.sidebarHeading]}>ACTIONS</h5>
          {project.user &&
            project.repository && (
              <div style={[styles.buttons]}>
                <GithubIcon
                  type="fork"
                  user={project.user}
                  repo={project.repository}
                />
                <GithubIcon
                  type="star"
                  user={project.user}
                  repo={project.repository}
                />
              </div>
            )}
          {project &&
            project.user && (
              <a
                style={[styles.panelText]}
                className="btn btn-block"
                href={`https://github.com/${project.user}/${
                  project.repository
                }`}
                target="_blank"
              >
                <img style={[styles.panelIcon]} src="/static/img/gh-icon.png" />
                Check out on GitHub
              </a>
            )}
          {
            <a
              style={[styles.panelText]}
              className="btn btn-block text-left"
              onClick={() =>
                openModal({
                  title: "Commit to GitHub",
                  type: "push_to_github",
                  project,
                  onClose: () => {},
                  onConfirm:
                    project.user && project.repository
                      ? content => savePorkFile(content)
                      : content => initPorkFile(content)
                })
              }
            >
              <i style={[styles.panelIcon]} className="fas fa-save" />
              Save to GitHub
            </a>
          }
        </div>
      </div>
    );
  }
}

export default Radium(Sidebar);
