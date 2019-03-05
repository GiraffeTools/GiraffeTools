import React, { Fragment } from "react";
import Radium from "radium";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { ClipLoader } from "react-spinners";

import styles from "../styles/searchBar.js";

function searchAPI(text, toolboxes) {
  const found = toolboxes.map(toolbox => {
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
    getMatches(toolbox, matches);
    return { ...matches, name: toolbox.name };
  });
  return found;
}

// const searchAPI = text => fetch("/search?text=" + encodeURIComponent(text));
const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500, {
  key: () => "search"
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searching: false,
      matchedNodes: null
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  async handleTextChange(event) {
    const { setSearchResults, setSearchText, toolboxes } = this.props;
    const searchText = event.target.value.toLowerCase();
    this.setState({ searchText, searching: true });
    setSearchText(searchText);
    const matchedNodes = await searchAPIDebounced(
      searchText,
      toolboxes.toolboxes
    );
    this.setState({ searching: false });
    setSearchResults({ toolboxes: matchedNodes });
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    const { results, searchText, searching } = this.state;

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default Radium(SearchBar);
