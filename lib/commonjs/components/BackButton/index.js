"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BackButton;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _BackIcon = require("../../svg/BackIcon");
var _reactNativePaper = require("react-native-paper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function BackButton({
  onPress
}) {
  const theme = (0, _reactNativePaper.useTheme)();
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      navigation.goBack();
      onPress && onPress();
    }
  }, /*#__PURE__*/_react.default.createElement(_BackIcon.BackIcon, {
    color: theme.colors.base
  }));
}
//# sourceMappingURL=index.js.map