import React, { Fragment } from "react";
import Radium from "radium";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { ClipLoader } from "react-spinners";

import styles from "../../styles/searchBar.js";

function searchAPI(text, toolboxes) {
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
    const nodes = [];
    category.nodes &&
      category.nodes.map(node => {
        if (node.name.toLowerCase().includes(text)) {
          nodes.push(node);
        }
      });
    if (categories.length) matches.categories = categories;
    if (nodes.length) matches.nodes = nodes;
    return matches;
  };

  const found = toolboxes.map(toolbox => {
    const matches = getMatches(toolbox);
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
    const matchedNodes = await searchAPIDebounced(searchText, toolboxes);
    this.setState({ searching: false });
    setSearchResults(matchedNodes);
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
