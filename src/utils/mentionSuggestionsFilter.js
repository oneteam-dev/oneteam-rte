const mentionSuggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  return suggestions.filter(suggestion => { // eslint-disable-line complexity
    const mentionName = suggestion.userName || suggestion.groupName || '';
    const email = suggestion.email || '';
    return !value ||
      (suggestion.name || '').toLowerCase().indexOf(value) > -1 ||
      mentionName.toLowerCase().indexOf(value) > -1 ||
      email.toLowerCase().indexOf(value) > -1;
  }).map(suggestion => {
    const id = suggestion.userName || suggestion.groupName || '';
    return {...suggestion, id}
  });
};

export default mentionSuggestionsFilter;
