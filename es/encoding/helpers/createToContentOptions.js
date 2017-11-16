var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { Entity } from 'draft-js';
import { getRegex } from 'react-oneteam/lib/Mention';
import { entityType, entityMutability } from '../../plugins/mention';

var createToContentOptions = function createToContentOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$mentions = _ref.mentions,
      mentions = _ref$mentions === undefined ? [] : _ref$mentions;

  return {
    textToEntity: function textToEntity(text) {
      var ret = [];
      var mentionRegex = getRegex();
      var result = void 0;

      var _loop = function _loop() {
        // eslint-disable-line no-cond-assign
        var _result = result,
            _result2 = _slicedToArray(_result, 2),
            match = _result2[0],
            mentionName /*, teamName*/ = _result2[1];

        var _result3 = result,
            offset = _result3.index;

        var mention = mentions.find(function (m) {
          return [m.get('userName'), m.get('groupName')].includes(mentionName);
        });
        if (mention) {
          // TODO: ref https://draftjs.org/docs/v0-10-api-migration.html#content
          //                 \
          var entityKey = Entity.__create(entityType, entityMutability, { mention: mention });
          ret.push({
            entity: entityKey,
            offset: offset,
            length: match.length,
            result: mention.get('name')
          });
        }
      };

      while (result = mentionRegex.exec(text)) {
        _loop();
      }
      return ret;
    }
  };
};

export default createToContentOptions;