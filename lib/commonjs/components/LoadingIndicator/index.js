"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoadingIndicator;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function LoadingIndicator({
  propStyle,
  size = 20,
  color = 'gray'
}) {
  let style = _styles.styles.container;
  if (propStyle !== undefined) {
    style = [_styles.styles.container, propStyle];
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: size,
    color: color
  }));
}
//# sourceMappingURL=index.js.map