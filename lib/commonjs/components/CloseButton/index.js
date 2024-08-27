"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CloseButton;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CloseButton({
  navigation
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => navigation.goBack()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.icon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.styles.cancelText
  }, (0, _translate.default)('Cancel'))));
}
//# sourceMappingURL=index.js.map