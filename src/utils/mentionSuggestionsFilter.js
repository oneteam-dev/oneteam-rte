const mentionSuggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter(suggestion => { // eslint-disable-line complexity
    const mentionName = suggestion.get('userName') || suggestion.get('groupName') || '';
    const email = suggestion.get('email') || '';
    return !value ||
      suggestion.get('name').toLowerCase().indexOf(value) > -1 ||
      mentionName.toLowerCase().indexOf(value) > -1 ||
      email.toLowerCase().indexOf(value) > -1;
  });
  const size = filteredSuggestions.size < 8 ? filteredSuggestions.size : 8;
  return filteredSuggestions.setSize(size);
};

export default mentionSuggestionsFilter;
