import React, { Fragment } from "react";
import Radium from "radium";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { ClipLoader } from "react-spinners";

import styles from "../styles/searchBar.js";

const getMatches = category => {
  const matches = {
    colour: category.colour,
    name: category.name
  };
  const categories = [];
  if (category.categories) {
    category.categories.map(subcategory => {
      const match = getMatches(subcategory);
      if (match.categories || match.nodes) {
        categories.push(match);
      }
    });
  }
  if (categories.length) matches.categories = categories;

  const nodes = [];
  category.nodes &&
    category.nodes.map(node => {
      if (node.name.toLowerCase().includes(text)) {
        nodes.push(node);
      }
    });
  if (nodes.length) matches.nodes = nodes;
  return matches;
};

function searchAPI(text, toolboxes) {
  return toolboxes.map(toolbox => ({
    ...getMatches(toolbox),
    name: toolbox.name
  }));
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
