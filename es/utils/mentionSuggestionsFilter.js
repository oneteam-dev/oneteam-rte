var mentionSuggestionsFilter = function mentionSuggestionsFilter(searchValue, suggestions) {
  var value = searchValue.toLowerCase();
  var filteredSuggestions = suggestions.filter(function (suggestion) {
    // eslint-disable-line complexity
    var mentionName = suggestion.userName || suggestion.groupName || '';
    var email = suggestion.email || '';
    return !value || (suggestion.name || '').toLowerCase().indexOf(value) > -1 || mentionName.toLowerCase().indexOf(value) > -1 || email.toLowerCase().indexOf(value) > -1;
  });
  var length = filteredSuggestions.length < 8 ? filteredSuggestions.length : 8;
  return filteredSuggestions.slice(0, length);
};

export default mentionSuggestionsFilter;