"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SectionHeader;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SectionHeader({
  title
}) {
  const styles = (0, _styles.useStyles)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.sectionHeader
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionHeaderText
  }, title));
}
;
//# sourceMappingURL=index.js.map