var mentionSuggestionsFilter = function mentionSuggestionsFilter(searchValue, suggestions) {
  var value = searchValue.toLowerCase();
  var filteredSuggestions = suggestions.filter(function (suggestion) {
    // eslint-disable-line complexity
    var mentionName = suggestion.get('userName') || suggestion.get('groupName') || '';
    var email = suggestion.get('email') || '';
    return !value || suggestion.get('name').toLowerCase().indexOf(value) > -1 || mentionName.toLowerCase().indexOf(value) > -1 || email.toLowerCase().indexOf(value) > -1;
  });
  var size = filteredSuggestions.size < 8 ? filteredSuggestions.size : 8;
  return filteredSuggestions.setSize(size);
};

export default mentionSuggestionsFilter;