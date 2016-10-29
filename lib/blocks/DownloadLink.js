'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DownloadLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DownloadLink(_ref) {
  var offsetKey = _ref.offsetKey,
      blockProps = _ref.blockProps;

  return _react2.default.createElement(
    'span',
    { className: 'download-link', 'data-offset-key': offsetKey },
    blockProps.name
  );
}

DownloadLink.propTypes = {
  offsetKey: _react.PropTypes.string,
  blockProps: _react.PropTypes.any
};
// {/*<div
//   className='download-link'
//   contentEditable='false'
//   suppressContentEditableWarning
//   data-offset-key={offsetKey}>
//   <div className='download-link-icon'></div>
//   <div className='download-link-body'>
//     <div className='download-link-name'>{name}</div>
//     <div className='download-link-size'>{`${size}`}</div>
//   </div>
//   <span className='download-link-name'>{name}</span>
// </div>*/}

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DownloadLink, 'DownloadLink', 'src/blocks/DownloadLink.js');
}();

;