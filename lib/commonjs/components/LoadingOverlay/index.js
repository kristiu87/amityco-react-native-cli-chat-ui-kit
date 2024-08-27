"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingOverlay = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LoadingOverlay = ({
  isLoading,
  loadingText
}) => {
  const styles = (0, _styles.useStyles)();
  if (!isLoading) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.overlay
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.indicatorContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: "#fff"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.loadingText
  }, loadingText)));
};
exports.LoadingOverlay = LoadingOverlay;
//# sourceMappingURL=index.js.map