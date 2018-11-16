import merge from 'lodash/merge';
import draftJsMentionPlugin from 'draft-js-mention-plugin';
import getTypeByTrigger from 'draft-js-mention-plugin/lib/utils/getTypeByTrigger';
import createPositionSuggestions from '../helpers/createPositionSuggestions';
import Mention from './components/Mention';
export var mentionTrigger = '@';
export var entityType = getTypeByTrigger(mentionTrigger);
export var mentionEntityType = entityType; // alias

export var entityMutability = 'IMMUTABLE';
export var mentionRegExp = "[\\-\\w\u4E00-\u9EFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3\u3130-\u318F]*";
export var defaultConfig = {
  mentionTrigger: mentionTrigger,
  entityMutability: entityMutability,
  positionSuggestions: createPositionSuggestions('bottom', function (_ref) {
    var state = _ref.state,
        props = _ref.props;
    return state.isActive && props.suggestions.length > 0;
  }),
  mentionRegExp: mentionRegExp,
  mentionComponent: Mention
};

var createMentionPlugin = function createMentionPlugin(config) {
  return draftJsMentionPlugin(merge({}, defaultConfig, config));
};

export default createMentionPlugin;