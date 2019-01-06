import React from "react";
import Radium from "radium";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import styles from "../styles/searchBar.js";

const searchAPI = text => fetch("/search?text=" + encodeURIComponent(text));
const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500);

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      results: null
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  async handleTextChange(event) {
    const searchText = event.target.value;
    this.setState({ searchText, results: null });
    const result = await searchAPIDebounced(searchText, { key: "search" });
    this.setState({ result });
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    const { results, searchText } = this.state;

    return (
      <div>
        <form>
          <input value={searchText} onChange={this.handleTextChange} />
        </form>
        {/*results && results.map(result => <SearchResult result={result} />)*/}
        {searchText.length ? (
          <span>Sorry, the search function not implemented yet :(</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Radium(SearchBar);
