"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectedUserHorizontal;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _AvatarIcon = require("../../svg/AvatarIcon");
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const maxLength = 10;
const displayName = user => {
  if (user.displayName) {
    if (user.displayName.length > maxLength) {
      return user.displayName.substring(0, maxLength) + '..';
    }
    return user.displayName;
  }
  return (0, _translate.default)('Display name');
};
const AvatarListItem = ({
  user,
  onDelete
}) => {
  const styles = (0, _styles.useStyles)();
  const {
    apiRegion
  } = (0, _useAuth.default)();
  const avatarFileURL = fileId => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatarContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatar
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatarImageContainer
  }, user.avatarFileId ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatarImage,
    source: {
      uri: avatarFileURL(user.avatarFileId)
    }
  }) : /*#__PURE__*/_react.default.createElement(_AvatarIcon.AvatarIcon, null)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDelete,
    style: styles.deleteButton
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.deleteButtonText
  }, "\u2715"))), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.userName
  }, displayName(user)));
};
function SelectedUserHorizontal({
  users,
  onDeleteUserPressed
}) {
  const styles = (0, _styles.useStyles)();
  const [scrollOffset, setScrollOffset] = (0, _react.useState)(0);
  const scrollViewRef = (0, _react.useRef)(null);
  const handleScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };
  const handleMomentumScrollEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollOffset,
        y: 0,
        animated: true
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: styles.container,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    onScroll: handleScroll,
    onMomentumScrollEnd: handleMomentumScrollEnd,
    ref: scrollViewRef,
    style: styles.selectedUser
  }, users.map(user => /*#__PURE__*/_react.default.createElement(AvatarListItem, {
    key: user.userId,
    user: user,
    onDelete: () => onDeleteUserPressed(user)
  })));
}
//# sourceMappingURL=index.js.map