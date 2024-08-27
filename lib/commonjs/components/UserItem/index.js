"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserItem;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _index = _interopRequireDefault(require("../RoundCheckbox/index"));
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _AvatarIcon = require("../../svg/AvatarIcon");
var _ThreeDotsIcon = require("../../svg/ThreeDotsIcon");
var _reactNativePaper = require("react-native-paper");
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function UserItem({
  user,
  isCheckmark,
  showThreeDot,
  onPress,
  onThreeDotTap,
  isUserAccount,
  disabled
}) {
  const theme = (0, _reactNativePaper.useTheme)();
  const styles = (0, _styles.useStyles)();
  const {
    apiRegion
  } = (0, _useAuth.default)();
  const [isChecked, setIsChecked] = (0, _react.useState)(false);
  const maxLength = 25;
  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onPress) {
      onPress(user);
    }
  };
  const displayName = () => {
    if (user.displayName) {
      if (user.displayName.length > maxLength) {
        return user.displayName.substring(0, maxLength) + '..';
      }
      return user.displayName;
    }
    return (0, _translate.default)('Display name');
  };
  const avatarFileURL = fileId => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };
  const Container = ({
    children
  }) => {
    if (disabled) return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.listItem
    }, children);
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.listItem,
      onPress: handleToggle
    }, children);
  };
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.leftContainer
  }, user !== null && user !== void 0 && user.avatarFileId ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatar,
    source: {
      uri: avatarFileURL(user.avatarFileId)
    }
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatar
  }, /*#__PURE__*/_react.default.createElement(_AvatarIcon.AvatarIcon, null)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.itemText
  }, displayName())), !isUserAccount && !showThreeDot ? !disabled && /*#__PURE__*/_react.default.createElement(_index.default, {
    isChecked: isCheckmark ?? false
  }) : !isUserAccount && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.threedotsBtn,
    onPress: () => {
      if (onThreeDotTap) {
        onThreeDotTap(user);
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_ThreeDotsIcon.ThreeDotsIcon, {
    color: theme.colors.base
  })));
}
//# sourceMappingURL=index.js.map