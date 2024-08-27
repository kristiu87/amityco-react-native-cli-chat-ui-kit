"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RecentChat;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _index = _interopRequireDefault(require("../../components/ChatList/index"));
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _moment = _interopRequireDefault(require("moment"));
var _styles = require("./styles");
var _CustomText = _interopRequireDefault(require("../../components/CustomText"));
var _native = require("@react-navigation/native");
var _index2 = _interopRequireDefault(require("../../components/LoadingIndicator/index"));
var _AddMembersModal = _interopRequireDefault(require("../../components/AddMembersModal"));
var _channelProvider = require("../../providers/channel-provider");
var _AddChat = require("../../svg/AddChat");
var _reactNativePaper = require("react-native-paper");
var _reactRedux = require("react-redux");
var _RecentChatSlice = _interopRequireDefault(require("../../redux/slices/RecentChatSlice"));
var _useIsRole = _interopRequireDefault(require("../../hooks/useIsRole"));
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function RecentChat() {
  const {
    client,
    isConnected
  } = (0, _useAuth.default)();
  const {
    channelList
  } = (0, _reactRedux.useSelector)(state => state.recentChat);
  const {
    updateRecentChat,
    clearChannelList
  } = _RecentChatSlice.default.actions;
  const dispatch = (0, _reactRedux.useDispatch)();
  const theme = (0, _reactNativePaper.useTheme)();
  const [loadChannel, setLoadChannel] = (0, _react.useState)(true);
  const [isModalVisible, setIsModalVisible] = (0, _react.useState)(false);
  const styles = (0, _styles.useStyles)();
  const flatListRef = (0, _react.useRef)(null);
  const [channelData, setChannelData] = (0, _react.useState)();
  const [isCSRole, isFetchedRole] = (0, _useIsRole.default)('customerService');
  const canCreateChannel = (0, _react.useMemo)(() => isFetchedRole && isCSRole, [isFetchedRole, isCSRole]);
  const {
    data: channels = [],
    onNextPage,
    hasNextPage
  } = channelData ?? {};
  const disposers = [];
  const subscribedChannels = [];
  const subscribeChannels = channels => channels.forEach(c => {
    if (!subscribedChannels.includes(c.channelId) && !c.isDeleted) {
      subscribedChannels.push(c.channelId);
      disposers.push((0, _tsSdkReactNative.subscribeTopic)((0, _tsSdkReactNative.getChannelTopic)(c)));
    }
  });
  const navigation = (0, _native.useNavigation)();
  (0, _react.useEffect)(() => {
    navigation.setOptions({
      header: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.topBar
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.titleText
      }, (0, _translate.default)('Chat')), canCreateChannel && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: () => {
          if (!canCreateChannel) return;
          setIsModalVisible(true);
        }
      }, /*#__PURE__*/_react.default.createElement(_AddChat.AddChatIcon, {
        color: theme.colors.base
      }))),
      headerTitle: ''
    });
  }, [canCreateChannel]);
  const onQueryChannel = () => {
    const unsubscribe = _tsSdkReactNative.ChannelRepository.getChannels({
      sortBy: 'lastActivity',
      limit: 15,
      membership: 'member'
    }, value => {
      setChannelData(value);
      subscribeChannels(channels);
      if (value.data.length === 0) {
        setLoadChannel(false);
      }
    });
    disposers.push(unsubscribe);
  };
  const isFocus = (0, _native.useIsFocused)();
  (0, _react.useEffect)(() => {
    onQueryChannel();
    return () => {
      disposers.forEach(fn => fn());
    };
  }, [isConnected, isFocus]);
  (0, _react.useEffect)(() => {
    if (channels.length > 0) {
      const formattedChannelObjects = channels.map(item => {
        const lastActivityDate = (0, _moment.default)(item.lastActivity).format('DD/MM/YYYY');
        const todayDate = (0, _moment.default)(Date.now()).format('DD/MM/YYYY');
        let dateDisplay;
        if (lastActivityDate === todayDate) {
          dateDisplay = (0, _moment.default)(item.lastActivity).format('hh:mm A');
        } else {
          dateDisplay = (0, _moment.default)(item.lastActivity).format('DD/MM/YYYY');
        }
        return {
          chatId: item.channelId ?? '',
          chatName: item.displayName ?? '',
          chatMemberNumber: item.memberCount ?? 0,
          unReadMessage: item.unreadCount ?? 0,
          messageDate: dateDisplay ?? '',
          channelType: item.type ?? '',
          avatarFileId: item.avatarFileId
        };
      });
      dispatch(clearChannelList());
      dispatch(updateRecentChat([...formattedChannelObjects]));
      setLoadChannel(false);
    }
  }, [channelData]);
  const handleLoadMore = () => {
    if (hasNextPage && onNextPage) {
      onNextPage();
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleOnFinish = async users => {
    const channel = await (0, _channelProvider.createAmityChannel)(client.userId, users);
    if (channel) {
      try {
        if (users.length === 1 && users[0]) {
          const oneOnOneChatObject = {
            userId: users[0].userId,
            displayName: users[0].displayName,
            avatarFileId: users[0].avatarFileId
          };
          navigation.navigate('ChatRoom', {
            channelId: channel.channelId,
            chatReceiver: oneOnOneChatObject
          });
        } else if (users.length > 1) {
          const chatDisplayName = users.map(item => item.displayName);
          const userObject = users.map(item => {
            return {
              userId: item.userId,
              displayName: item.displayName,
              avatarFileId: item.avatarFileId
            };
          });
          const groupChatObject = {
            displayName: chatDisplayName.join(','),
            users: userObject,
            memberCount: channel.memberCount,
            avatarFileId: channel.avatarFileId
          };
          navigation.navigate('ChatRoom', {
            channelId: channel.channelId,
            groupChat: groupChatObject
          });
        }
        console.log('create chat success ' + JSON.stringify(channel));
      } catch (error) {
        console.log('create chat error ' + JSON.stringify(error));
        console.error(error);
      }
    }
  };
  const renderRecentChat = (0, _react.useMemo)(() => {
    if (loadChannel) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: 20
        }
      }, /*#__PURE__*/_react.default.createElement(_index2.default, null));
    }
    if (channelList && channelList.length <= 0) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.NoConversationContainer
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.NoConversationText
      }, (0, _translate.default)('No Conversation')));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.chatListContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: channelList,
      renderItem: ({
        item
      }) => renderChatList(item),
      keyExtractor: item => item.chatId.toString() + (item === null || item === void 0 ? void 0 : item.avatarFileId),
      onEndReached: handleLoadMore,
      onEndReachedThreshold: 0.4,
      ref: flatListRef,
      extraData: channelList
    }));
  }, [loadChannel, channelList, handleLoadMore]);
  const renderChatList = item => {
    return /*#__PURE__*/_react.default.createElement(_index.default, {
      key: item.chatId,
      chatId: item.chatId,
      chatName: item.chatName,
      chatMemberNumber: item.chatMemberNumber,
      unReadMessage: item.unReadMessage,
      messageDate: item.messageDate,
      channelType: item.channelType,
      avatarFileId: item.avatarFileId
    });
  };
  const renderTabView = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.tabView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.indicator
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.tabViewTitle
    }, (0, _translate.default)('Recent'))));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.chatContainer
  }, renderTabView(), renderRecentChat, canCreateChannel && /*#__PURE__*/_react.default.createElement(_AddMembersModal.default, {
    onFinish: handleOnFinish,
    onClose: handleCloseModal,
    visible: isModalVisible
  }));
}
//# sourceMappingURL=RecentChat.js.map