import merge from 'lodash/merge';
import draftJsMentionPlugin from 'draft-js-mention-plugin';
import getTypeByTrigger from 'draft-js-mention-plugin/lib/utils/getTypeByTrigger';
import createPositionSuggestions from '../helpers/createPositionSuggestions';
import Mention from './components/Mention';

export const mentionTrigger = '@';
export const entityType = getTypeByTrigger(mentionTrigger);
export const mentionEntityType = entityType; // alias
export const entityMutability = 'IMMUTABLE';
export const mentionRegExp = '[\\-\\w\u4e00-\u9eff\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3\u3130-\u318F]*';

export const defaultConfig = {
  mentionTrigger,
  entityMutability,
  positionSuggestions: createPositionSuggestions(
    'bottom',
    ({ state, props }) => state.isActive && props.suggestions.length > 0
  ),
  mentionRegExp,
  mentionComponent: Mention
};

const createMentionPlugin = config => {
  return draftJsMentionPlugin(
    merge({}, defaultConfig, config)
  );
};

export default createMentionPlugin;
