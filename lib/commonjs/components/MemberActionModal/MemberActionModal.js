"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("./styles");
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _useAuth = _interopRequireDefault(require("./../../hooks/useAuth"));
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MemberActionModal = ({
  isVisible,
  setIsVisible,
  userId,
  channelId,
  hasModeratorPermission,
  isInModeratorTab,
  isChannelModerator,
  onFinish
}) => {
  const styles = (0, _styles.useStyles)();
  const slideAnimation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const {
    client
  } = (0, _useAuth.default)();
  const currentUserId = client.userId ?? '';
  async function addRole() {
    const didAdd = await _tsSdkReactNative.ChannelRepository.Moderation.addRole(channelId, 'channel-moderator', [userId]);
    if (didAdd) {
      _reactNative.Alert.alert((0, _translate.default)('Promote to moderator'));
    }
  }
  async function removeRole() {
    const didRemove = await _tsSdkReactNative.ChannelRepository.Moderation.removeRole(channelId, 'channel-moderator', [userId]);
    if (didRemove) {
      _reactNative.Alert.alert('Remove user from moderator');
    }
  }
  const actionData = (0, _react.useMemo)(() => [{
    id: 'demote',
    label: (0, _translate.default)('Dismiss to member'),
    shouldShow: hasModeratorPermission && currentUserId !== userId && isInModeratorTab,
    callBack: async () => {
      removeRole();
      onFinish && onFinish();
    }
  }, {
    id: 'promote',
    label: (0, _translate.default)('Promote to moderator'),
    shouldShow: hasModeratorPermission && currentUserId !== userId && !isInModeratorTab && !isChannelModerator,
    callBack: async () => {
      addRole();
      onFinish && onFinish();
    }
  }, {
    id: 'report',
    label: (0, _translate.default)('Report User'),
    shouldShow: currentUserId !== userId,
    callBack: async () => {
      const isReport = await (0, _tsSdkReactNative.createReport)('user', userId);
      if (isReport) {
        _reactNative.Alert.alert('Report sent ✅');
        onFinish && onFinish();
      }
    }
  }], [channelId, currentUserId, hasModeratorPermission, isInModeratorTab, userId]);
  const closeModal = (0, _react.useCallback)(() => {
    _reactNative.Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => setIsVisible(false));
  }, [setIsVisible, slideAnimation]);
  const onPressAction = (0, _react.useCallback)(async ({
    callBack
  }) => {
    try {
      await callBack();
    } catch (error) {}
    closeModal();
  }, [closeModal]);
  (0, _react.useEffect)(() => {
    if (isVisible) {
      _reactNative.Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [isVisible, slideAnimation]);
  const modalStyle = {
    transform: [{
      translateY: slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0]
      })
    }]
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    animationType: "fade",
    transparent: true,
    visible: isVisible,
    onRequestClose: closeModal
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: closeModal,
    style: styles.modalContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.modalContent, modalStyle]
  }, actionData.map(data => {
    const warningStyle = data.id === 'remove' ? {
      color: 'red'
    } : null;
    if (data.shouldShow) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        key: data.id,
        onPress: () => onPressAction(data),
        style: styles.modalRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [styles.actionText, warningStyle]
      }, data.label));
    } else return null;
  }))));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(MemberActionModal);
//# sourceMappingURL=MemberActionModal.js.map