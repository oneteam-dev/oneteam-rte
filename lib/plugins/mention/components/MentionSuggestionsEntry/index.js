'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOneteam = require('react-oneteam');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MentionSuggestionsEntry = function MentionSuggestionsEntry(props) {
  var mention = props.mention,
      className = props.className,
      theme = props.theme,
      searchValue = props.searchValue,
      rest = _objectWithoutProperties(props, ['mention', 'className', 'theme', 'searchValue']);

  var name = mention.get('name');
  var email = mention.get('email');
  var username = '' + _.mentionTrigger + (mention.get('userName') || mention.get('groupName') || '');
  var user = {
    profile_photo: { thumbnail_url: mention.get('avatarURL') },
    name: name
  };

  return _react2.default.createElement(_reactOneteam.MentionSelectCell, _extends({}, rest, {
    className: className,
    user: user,
    username: username,
    name: name,
    email: email
  }));
};

MentionSuggestionsEntry.propTypes = {
  mention: _propTypes2.default.instanceOf(_immutable.Map),
  className: _propTypes2.default.string,
  theme: _propTypes2.default.object,
  searchValue: _propTypes2.default.string
};

exports.default = MentionSuggestionsEntry;