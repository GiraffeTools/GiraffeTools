import { connect } from "react-redux";

import SearchBar from "../components/searchBar";
import { setSearchText } from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setSearchText: text => dispatch(setSearchText(text))
});

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
