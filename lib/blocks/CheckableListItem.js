'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckableListItem = function (_Component) {
  _inherits(CheckableListItem, _Component);

  function CheckableListItem(props) {
    _classCallCheck(this, CheckableListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CheckableListItem).call(this, props));
  }

  _createClass(CheckableListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var blockProps = _props.blockProps;
      var offsetKey = _props.offsetKey;
      var checked = blockProps.checked;
      var onChangeChecked = blockProps.onChangeChecked;


      return _react2.default.createElement(
        'div',
        { 'data-offset-key': offsetKey, className: 'checkable-list-item-body' },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('checkable-list-item-checkbox', {
              'is-checked': checked
            }) },
          _react2.default.createElement('input', {
            type: 'checkbox',
            contentEditable: 'false',
            suppressContentEditableWarning: true,
            checked: checked, onChange: onChangeChecked })
        ),
        _react2.default.createElement(
          'div',
          { className: 'checkable-list-item-text' },
          _react2.default.createElement(_draftJs.EditorBlock, this.props)
        )
      );
    }
  }]);

  return CheckableListItem;
}(_react.Component);

exports.default = CheckableListItem;


CheckableListItem.displayName = 'CheckableListItem';
CheckableListItem.propTypes = {
  offsetKey: _react.PropTypes.string,
  blockProps: _react.PropTypes.shape({
    checked: _react.PropTypes.bool.isRequired,
    onChangeChecked: _react.PropTypes.func.isRequired
  }).isRequired
};