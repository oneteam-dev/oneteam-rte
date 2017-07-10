'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.mentionRegExp = exports.entityMutability = exports.mentionEntityType = exports.entityType = exports.mentionTrigger = undefined;

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _getTypeByTrigger = require('draft-js-mention-plugin/lib/utils/getTypeByTrigger');

var _getTypeByTrigger2 = _interopRequireDefault(_getTypeByTrigger);

var _createPositionSuggestions = require('../helpers/createPositionSuggestions');

var _createPositionSuggestions2 = _interopRequireDefault(_createPositionSuggestions);

var _Mention = require('./components/Mention');

var _Mention2 = _interopRequireDefault(_Mention);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mentionTrigger = exports.mentionTrigger = '@';
var entityType = exports.entityType = (0, _getTypeByTrigger2.default)(mentionTrigger);
var mentionEntityType = exports.mentionEntityType = entityType; // alias
var entityMutability = exports.entityMutability = 'IMMUTABLE';
var mentionRegExp = exports.mentionRegExp = '[\\-\\w\u4E00-\u9EFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3\u3130-\u318F]*';

var defaultConfig = exports.defaultConfig = {
  mentionTrigger: mentionTrigger,
  entityMutability: entityMutability,
  positionSuggestions: (0, _createPositionSuggestions2.default)('bottom', function (_ref) {
    var state = _ref.state,
        props = _ref.props;
    return state.isActive && props.suggestions.size > 0;
  }),
  mentionRegExp: mentionRegExp,
  mentionComponent: _Mention2.default
};

var createMentionPlugin = function createMentionPlugin(config) {
  return (0, _draftJsMentionPlugin2.default)((0, _merge2.default)({}, defaultConfig, config));
};

exports.default = createMentionPlugin;