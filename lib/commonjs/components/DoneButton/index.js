"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DoneButton;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function DoneButton({
  onDonePressed
}) {
  const styles = (0, _styles.useStyles)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDonePressed
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.icon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.doneText
  }, (0, _translate.default)('Done'))));
}
//# sourceMappingURL=index.js.map