const mentionSuggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter(suggestion => { // eslint-disable-line complexity
    const mentionName = suggestion.userName || suggestion.groupName || '';
    const email = suggestion.email || '';
    return !value ||
      (suggestion.name || '').toLowerCase().indexOf(value) > -1 ||
      mentionName.toLowerCase().indexOf(value) > -1 ||
      email.toLowerCase().indexOf(value) > -1;
  });
  const length = filteredSuggestions.length < 8 ? filteredSuggestions.length : 8;
  return filteredSuggestions.slice(0, length);
};

export default mentionSuggestionsFilter;
