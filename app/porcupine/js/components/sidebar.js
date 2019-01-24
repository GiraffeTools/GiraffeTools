import React from "react";
import { StyleRoot } from "radium";
import { ClipLoader } from "react-spinners";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { v4 } from "uuid";

import GithubIcon from "./githubIcon";
import PaneGroup from "./paneGroup";
import SearchBar from "./searchBar";
import styles from "../styles/sidebar";
import { savePorkFile } from "../utils/savePorkFile";
import { API_HOST } from "../../../giraffe/js/config";

function searchAPI(text, nodes) {
  const matches = {};
  const getMatches = (nodes, matches) => {
    if (nodes.categories) {
      matches.categories = {};
      Object.keys(nodes.categories).map(category => {
        matches.categories[category] = {};
        getMatches(nodes.categories[category], matches.categories[category]);
        if (!Object.keys(matches.categories[category]).length) {
          delete matches.categories[category];
        }
      });
      if (!Object.keys(matches.categories).length) {
        delete matches.categories;
      }
    }
    nodes.nodes &&
      Object.keys(nodes.nodes).map(node => {
        if (node.toLowerCase().includes(text)) {
          if (!matches.nodes) matches.nodes = {};
          matches.nodes[node] = nodes.nodes[node];
        }
      });
    if (Object.keys(matches).length) {
      matches.colour = nodes.colour;
    }
  };
  getMatches(nodes, matches);
  return matches;
}

// const searchAPI = text => fetch("/search?text=" + encodeURIComponent(text));
const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500, {
  key: () => "search"
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searching: false,
      allNodes: null,
      matchedNodes: null
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  async handleTextChange(event) {
    const { allNodes } = this.state;
    const searchText = event.target.value.toLowerCase();
    this.setState({ searchText, searching: true });
    const matchedNodes = await searchAPIDebounced(searchText, allNodes);
    this.setState({ matchedNodes, searching: false });
  }

  async componentDidMount() {
    const nodes = await fetch(`${API_HOST}/nodes`);
    this.setState({ allNodes: await nodes.json() });
  }

  render() {
    const { showSidebar, project, openModal } = this.props;
    const { allNodes, matchedNodes, searchText, searching } = this.state;
    const currentNodes = searchText.length ? matchedNodes : allNodes;
    const { nodes, links } = this.props;

    return (
      <StyleRoot>
        <div
          style={[styles.sidebar, showSidebar && styles.sidebar.active]}
          className="customScrollbar"
        >
          <div style={[styles.logoSidebar]}>
            <a href="/">
              <img
                style={[styles.logo]}
                src={"/static/img/giraffetools_logo_notext.png"}
                className="img-responsive"
                alt="logo"
              />
            </a>
          </div>
          <div className="col-md-12">
            {/* <h5 style={[styles.sidebarHeading]}>SEARCH</h5> */}
            {/* <SearchBar nodes={allNodes}/> */}
            <h5 style={[styles.sidebarHeading]}>NODES</h5>
            <form>
              <input
                value={searchText}
                onChange={this.handleTextChange}
                style={[styles.searchInput]}
              />
              <ClipLoader
                sizeUnit={"%"}
                size={10}
                color={"#123abc"}
                loading={searching}
              />
            </form>
            <div
              style={[styles.panelGroup]}
              role="tablist"
              aria-multiselectable="true"
            >
              {currentNodes &&
                currentNodes.categories &&
                Object.keys(currentNodes.categories).map(category => {
                  return (
                    <PaneGroup
                      key={category}
                      category={category}
                      nodes={currentNodes.categories[category]}
                    />
                  );
                })}
            </div>
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
                  <img
                    style={[styles.panelIcon]}
                    src="/static/img/gh-icon.png"
                  />
                  Check out on GitHub
                </a>
              )}
            {
              <a
                style={[styles.panelText]}
                className="btn btn-block text-left"
                onClick={() =>
                  openModal({
                    id: v4(),
                    title: "Commit to GitHub",
                    type: "push_to_github",
                    project,
                    onClose: () => {},
                    onConfirm: () => savePorkFile(nodes, links, project)
                  })
                }
              >
                <i style={[styles.panelIcon]} className="fas fa-save" />
                Save to GitHub
              </a>
            }
          </div>
        </div>
      </StyleRoot>
    );
  }
}

export default Sidebar;
