"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRoomSetting = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _channelProvider = require("../../providers/channel-provider");
var _styles = require("./styles");
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _reactNativeAwesomeAlerts = _interopRequireDefault(require("react-native-awesome-alerts"));
var _EditIcon = _interopRequireDefault(require("../../svg/EditIcon"));
var _ArrowRightIcon = require("../../svg/ArrowRightIcon");
var _GroupMembersIcon = require("../../svg/GroupMembersIcon");
var _BackIcon = require("../../svg/BackIcon");
var _reactNativePaper = require("react-native-paper");
var _useIsRole = _interopRequireDefault(require("../../hooks/useIsRole"));
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChatRoomSetting = ({
  navigation,
  route
}) => {
  const [isVipUser, isResultReady] = (0, _useIsRole.default)('vipUser');
  const theme = (0, _reactNativePaper.useTheme)();
  const styles = (0, _styles.useStyles)();
  const {
    channelId,
    channelType,
    chatReceiver,
    groupChat
  } = route.params;
  const [showReportAlert, setShowReportAlert] = (0, _react.useState)(false);
  const handleGroupProfilePress = () => {
    navigation.navigate('EditChatDetail', {
      navigation,
      channelId: channelId,
      groupChat: groupChat
    });
  };
  const handleMembersPress = () => {
    navigation.navigate('MemberDetail', {
      navigation,
      channelID: channelId
    });
  };
  const handleLeaveChatPress = async () => {
    _reactNative.Alert.alert((0, _translate.default)('Leave Chat'), (0, _translate.default)('If leave this group, you’ll no longer be able to see any messages and files.'), [{
      text: (0, _translate.default)('Cancel'),
      style: 'cancel'
    }, {
      text: (0, _translate.default)('Leave'),
      style: 'destructive',
      onPress: () => onLeaveChat()
    }]);
  };
  async function flagUser() {
    if (chatReceiver) {
      const didCreateUserReport = await (0, _tsSdkReactNative.createReport)('user', chatReceiver.userId);
      if (didCreateUserReport) {
        _reactNative.Alert.alert((0, _translate.default)('Report sent'), '', [{
          text: (0, _translate.default)('Ok')
        }]);
      }
    }
  }
  const onLeaveChat = async () => {
    try {
      const isLeave = await (0, _channelProvider.leaveAmityChannel)(channelId);
      if (isLeave) {
        navigation.navigate('RecentChat');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const renderItem = ({
    item
  }) => {
    switch (item.id) {
      case 1:
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.rowContainer,
          onPress: handleGroupProfilePress
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.iconContainer
        }, /*#__PURE__*/_react.default.createElement(_EditIcon.default, null)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: styles.rowText
        }, (0, _translate.default)('Group profile')), /*#__PURE__*/_react.default.createElement(_ArrowRightIcon.ArrowRightIcon, null));
      case 2:
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.rowContainer,
          onPress: handleMembersPress
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.iconContainer
        }, /*#__PURE__*/_react.default.createElement(_GroupMembersIcon.GroupMembersIcon, null)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: styles.rowText
        }, (0, _translate.default)('Members')), /*#__PURE__*/_react.default.createElement(_ArrowRightIcon.ArrowRightIcon, {
          color: theme.colors.base
        }));
      case 3:
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.rowContainer,
          onPress: handleLeaveChatPress
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.ChatSettingContainer
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: styles.leaveChatLabel
        }, (0, _translate.default)('Leave Chat'))));
      default:
        return null;
    }
  };
  const data = [{
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleGoBack,
    style: styles.closeButton
  }, /*#__PURE__*/_react.default.createElement(_BackIcon.BackIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText
  }, (0, _translate.default)('Chat Detail')))), channelType === 'conversation' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.rowContainer,
    onPress: flagUser
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.ChatSettingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.reportChatLabel
  }, (0, _translate.default)('Report User')))) : !isVipUser && isResultReady && /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: data,
    renderItem: renderItem,
    keyExtractor: item => item.id.toString()
  }), /*#__PURE__*/_react.default.createElement(_reactNativeAwesomeAlerts.default, {
    show: showReportAlert,
    showProgress: false,
    title: "Report sent",
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: false,
    showCancelButton: false,
    showConfirmButton: true,
    confirmText: (0, _translate.default)('Ok'),
    confirmButtonColor: "#1054DE",
    onCancelPressed: () => {
      setShowReportAlert(false);
    },
    onConfirmPressed: () => setShowReportAlert(false),
    onDismiss: () => setShowReportAlert(false)
  }));
};
exports.ChatRoomSetting = ChatRoomSetting;
//# sourceMappingURL=ChatRoomSetting.js.map