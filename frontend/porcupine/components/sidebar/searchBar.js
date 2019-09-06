import React, {forwardRef, useState, useEffect} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import styles from '../../styles/searchBar';
import docStyles from '../../constants/styles';
import {useDebounce} from '../../utils/hooks';

function searchAPI(text, toolboxes) {
  const getMatches = (category) => {
    const matches = {
      colour: category.colour,
      name: category.name,
    };
    const categories = [];
    if (category.categories) {
      category.categories.map((subcategory) => {
        const match = getMatches(subcategory);
        if (match.categories || match.nodes) {
          categories.push(match);
        }
      });
    }
    const nodes = [];
    category.nodes &&
      category.nodes.map((node) => {
        if (node.name && node.name.toLowerCase().includes(text)) {
          nodes.push(node);
        }
      });
    if (categories.length) matches.categories = categories;
    if (nodes.length) matches.nodes = nodes;
    return matches;
  };

  const found = toolboxes.map((toolbox) => {
    const matches = getMatches(toolbox);
    return {...matches, name: toolbox.name};
  });
  return found;
}

const DEBOUNCE_INTERVAL = 500;
const SearchBar = forwardRef((props, ref) => {
  const [searchText, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const {setSearchResults, toolboxes} = props;

  const debouncedSearchTerm = useDebounce(searchText, DEBOUNCE_INTERVAL);

  useEffect(
      () => {
        async function debounce() {
          if (debouncedSearchTerm) {
            setIsSearching(true);
            const results = await searchAPI(debouncedSearchTerm, toolboxes);
            setIsSearching(false);
            setSearchResults(results);
          } else {
            setSearchResults({});
          }
        }
        debounce();
      },
      [debouncedSearchTerm]
  );

  return (
    <form>
      <input
        ref={ref}
        value={searchText}
        onChange={(event) => setSearchTerm(event.target.value.toLowerCase())}
        style={styles.searchInput}
      />
      <ClipLoader
        size={20}
        color={docStyles.secondaryColor}
        loading={isSearching}
      />
    </form>
  );
});
SearchBar.displayName = 'SearchBar';
export default SearchBar;
