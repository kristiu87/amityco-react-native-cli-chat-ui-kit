"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNative = require("react-native");
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _CustomText = _interopRequireDefault(require("../CustomText"));
var _styles = require("./styles");
var _native = require("@react-navigation/native");
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _CommunityChatIcon = require("../../svg/CommunityChatIcon");
var _PrivateChatIcon = require("../../svg/PrivateChatIcon");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

const ChatList = ({
  chatId,
  chatName,
  chatMemberNumber,
  unReadMessage,
  messageDate,
  channelType,
  avatarFileId
}) => {
  const navigation = (0, _native.useNavigation)();
  const {
    client,
    apiRegion
  } = (0, _useAuth.default)();
  const [oneOnOneChatObject, setOneOnOneChatObject] = (0, _react.useState)();
  const [groupChatObject, setGroupChatObject] = (0, _react.useState)();
  const [channelAvatarFileId, setChannelAvatarFileId] = (0, _react.useState)(avatarFileId);
  const [channelDisplayName, setChannelDisplayName] = (0, _react.useState)(chatName);
  const [previewMessage, setPreviewMessage] = (0, _react.useState)();
  const styles = (0, _styles.useStyles)();
  const handlePress = chatMemberNumber => {
    if (oneOnOneChatObject) {
      var _oneOnOneChatObject$t, _oneOnOneChatObject$t2, _oneOnOneChatObject$t3;
      const targetIndex = oneOnOneChatObject === null || oneOnOneChatObject === void 0 ? void 0 : oneOnOneChatObject.findIndex(item => item.userId !== client.userId);
      const chatReceiver = {
        userId: (_oneOnOneChatObject$t = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t === void 0 ? void 0 : _oneOnOneChatObject$t.userId,
        displayName: (_oneOnOneChatObject$t2 = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t2 === void 0 || (_oneOnOneChatObject$t2 = _oneOnOneChatObject$t2.user) === null || _oneOnOneChatObject$t2 === void 0 ? void 0 : _oneOnOneChatObject$t2.displayName,
        avatarFileId: ((_oneOnOneChatObject$t3 = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t3 === void 0 || (_oneOnOneChatObject$t3 = _oneOnOneChatObject$t3.user) === null || _oneOnOneChatObject$t3 === void 0 ? void 0 : _oneOnOneChatObject$t3.avatarFileId) ?? ''
      };
      if (chatReceiver.userId) {
        navigation.navigate('ChatRoom', {
          channelId: chatId,
          chatReceiver: chatReceiver
        });
      }
    }
    if (groupChatObject) {
      const userArr = groupChatObject === null || groupChatObject === void 0 ? void 0 : groupChatObject.map(item => {
        var _item$user, _item$user2;
        return {
          userId: item.userId,
          displayName: (_item$user = item.user) === null || _item$user === void 0 ? void 0 : _item$user.displayName,
          avatarFileId: (_item$user2 = item.user) === null || _item$user2 === void 0 ? void 0 : _item$user2.avatarFileId
        };
      });
      const groupChat = {
        users: userArr,
        displayName: chatName,
        avatarFileId: avatarFileId,
        memberCount: chatMemberNumber
      };
      navigation.navigate('ChatRoom', {
        channelId: chatId,
        groupChat: groupChat
      });
    }
  };
  (0, _react.useEffect)(() => {
    const unsubMembers = _tsSdkReactNative.ChannelRepository.Membership.getMembers({
      channelId: chatId
    }, ({
      data: members
    }) => {
      if (chatMemberNumber === 2 && members) {
        setOneOnOneChatObject(members);
      } else if (members) {
        setGroupChatObject(members);
      }
    });
    const unsubChannel = _tsSdkReactNative.ChannelRepository.getChannel(chatId, ({
      data: channel
    }) => {
      if (channel) {
        const {
          messagePreview: channelMessagePreview
        } = channel;
        if (channelMessagePreview && channelMessagePreview.data) {
          setPreviewMessage(channelMessagePreview.data.text || channelMessagePreview.dataType[0].toUpperCase() + channelMessagePreview.dataType.slice(1));
        }
      }
    });
    return () => {
      unsubMembers();
      unsubChannel();
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (oneOnOneChatObject) {
      var _oneOnOneChatObject$t4, _oneOnOneChatObject$t5;
      const targetIndex = oneOnOneChatObject === null || oneOnOneChatObject === void 0 ? void 0 : oneOnOneChatObject.findIndex(item => item.userId !== client.userId);
      setChannelAvatarFileId(((_oneOnOneChatObject$t4 = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t4 === void 0 || (_oneOnOneChatObject$t4 = _oneOnOneChatObject$t4.user) === null || _oneOnOneChatObject$t4 === void 0 ? void 0 : _oneOnOneChatObject$t4.avatarFileId) ?? avatarFileId);
      setChannelDisplayName((_oneOnOneChatObject$t5 = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t5 === void 0 || (_oneOnOneChatObject$t5 = _oneOnOneChatObject$t5.user) === null || _oneOnOneChatObject$t5 === void 0 ? void 0 : _oneOnOneChatObject$t5.displayName);
    }
  }, [oneOnOneChatObject]);
  return /*#__PURE__*/React.createElement(_reactNative.TouchableHighlight, {
    onPress: () => handlePress(chatMemberNumber)
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.chatCard
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.avatarSection
  }, channelAvatarFileId ? /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: styles.icon,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${channelAvatarFileId}/download?size=small`
    }
  }) : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.icon
  }, channelType === 'community' ? /*#__PURE__*/React.createElement(_CommunityChatIcon.CommunityChatIcon, null) : /*#__PURE__*/React.createElement(_PrivateChatIcon.PrivateChatIcon, null))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.chatDetailSection
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.chatTitleWrap
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.chatNameWrap
  }, /*#__PURE__*/React.createElement(_CustomText.default, {
    style: styles.chatName,
    numberOfLines: 1
  }, channelDisplayName), /*#__PURE__*/React.createElement(_CustomText.default, {
    style: styles.chatLightText
  }, "(", chatMemberNumber, ")")), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.chatTimeWrap
  }, /*#__PURE__*/React.createElement(_CustomText.default, {
    style: styles.chatLightText
  }, messageDate))), previewMessage && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.chatPreviewWrap
  }, /*#__PURE__*/React.createElement(_CustomText.default, {
    style: styles.chatPreviewMessage,
    numberOfLines: 2
  }, previewMessage), unReadMessage > 0 && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.unReadBadge
  }, /*#__PURE__*/React.createElement(_CustomText.default, {
    style: styles.unReadText
  }, unReadMessage))))));
};
var _default = exports.default = ChatList;
//# sourceMappingURL=index.js.map