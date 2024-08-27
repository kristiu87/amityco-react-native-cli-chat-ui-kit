"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeImageViewing = _interopRequireDefault(require("react-native-image-viewing"));
var _CustomText = _interopRequireDefault(require("../../components/CustomText"));
var _styles = require("./styles");
var _native = require("@react-navigation/native");
var _BackButton = _interopRequireDefault(require("../../components/BackButton"));
var _moment = _interopRequireDefault(require("moment"));
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _reactNativeImagePicker = require("react-native-image-picker");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativePopupMenu = require("react-native-popup-menu");
var _reactNativeSvg = require("react-native-svg");
var _svgXmlList = require("../../svg/svg-xml-list");
var _EditMessageModal = _interopRequireDefault(require("../../components/EditMessageModal"));
var _GroupChatIcon = require("../../svg/GroupChatIcon");
var _AvatarIcon = require("../../svg/AvatarIcon");
var _CameraBoldIcon = require("../../svg/CameraBoldIcon");
var _MenuIcon = require("../../svg/MenuIcon");
var _PlusIcon = require("../../svg/PlusIcon");
var _SendChatIcon = require("../../svg/SendChatIcon");
var _AlbumIcon = require("../../svg/AlbumIcon");
var _reactNativePaper = require("react-native-paper");
var _userProvider = require("../../providers/user-provider");
var _reactRedux = require("react-redux");
var _useIsRole = _interopRequireDefault(require("../../hooks/useIsRole"));
var _useGoBackIfNotRelatedToChannel = _interopRequireDefault(require("../../hooks/useGoBackIfNotRelatedToChannel"));
var _useCanChat = _interopRequireDefault(require("../../hooks/useCanChat"));
var _fileMessageUploadProvider = require("../../providers/file-message-upload-provider");
var _BaseLoadingImage = _interopRequireDefault(require("../../components/BaseLoadingImage"));
var _reactNativePermissions = require("react-native-permissions");
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

const CameraLibraryPermissions = {
  ios: _reactNativePermissions.PERMISSIONS.IOS.CAMERA,
  android: _reactNativePermissions.PERMISSIONS.ANDROID.CAMERA
};
const PhotoLibraryPermissions = {
  ios: _reactNativePermissions.PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: _reactNative.Platform.constants["Release"] >= 13 ? _reactNativePermissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : _reactNativePermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
};
_reactNative.LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
_reactNative.LogBox.ignoreAllLogs();
const ChatRoom = ({
  route
}) => {
  const [isVipUser, isResultReady] = (0, _useIsRole.default)('vipUser');
  const {
    channelList
  } = (0, _reactRedux.useSelector)(state => state.recentChat);
  const styles = (0, _styles.useStyles)();
  const navigation = (0, _native.useNavigation)();
  let {
    chatReceiver,
    groupChat,
    channelId
  } = route.params;
  const {
    client,
    apiRegion
  } = (0, _useAuth.default)();
  const [messages, setMessages] = (0, _react.useState)([]);
  const [messagesData, setMessagesData] = (0, _react.useState)();
  const [imageMultipleUri, setImageMultipleUri] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    console.log(imageMultipleUri);
  }, [imageMultipleUri]);
  const theme = (0, _reactNativePaper.useTheme)();
  const {
    data: messagesArr = [],
    onNextPage,
    hasNextPage
  } = messagesData ?? {};
  const [groupChatInfo, setGroupChatInfo] = (0, _react.useState)({
    ...groupChat
  });
  const canChat = (0, _useCanChat.default)(channelId);
  (0, _useGoBackIfNotRelatedToChannel.default)(channelId);
  const [inputMessage, setInputMessage] = (0, _react.useState)('');
  const [sortedMessages, setSortedMessages] = (0, _react.useState)([]);
  const flatListRef = (0, _react.useRef)(null);
  const [isExpanded, setIsExpanded] = (0, _react.useState)(false);
  const [visibleFullImage, setIsVisibleFullImage] = (0, _react.useState)(false);
  const [fullImage, setFullImage] = (0, _react.useState)('');
  const [subChannelData, setSubChannelData] = (0, _react.useState)();
  const [displayImages, setDisplayImages] = (0, _react.useState)([]);
  const [editMessageModal, setEditMessageModal] = (0, _react.useState)(false);
  const [editMessageId, setEditMessageId] = (0, _react.useState)('');
  const [editMessageText, setEditMessageText] = (0, _react.useState)('');
  const {
    upload,
    uploadList
  } = (0, _react.useContext)(_fileMessageUploadProvider.FileMessegeUploadContext);
  const disposers = [];
  const subscribeSubChannel = subChannel => disposers.push((0, _tsSdkReactNative.subscribeTopic)((0, _tsSdkReactNative.getSubChannelTopic)(subChannel)));
  (0, _react.useEffect)(() => {
    const currentChannel = channelList.find(item => item.chatId === channelId);
    setGroupChatInfo({
      displayName: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.chatName,
      avatarFileId: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.avatarFileId,
      memberCount: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.chatMemberNumber
    });
  }, [channelList]);
  (0, _react.useEffect)(() => {
    if (channelId) {
      _tsSdkReactNative.SubChannelRepository.getSubChannel(channelId, ({
        data: subChannel
      }) => {
        setSubChannelData(subChannel);
      });
    }
    return () => {
      disposers.forEach(fn => fn());
      stopRead();
    };
  }, [channelId]);
  const startRead = async () => {
    await _tsSdkReactNative.SubChannelRepository.startMessageReceiptSync(channelId);
  };
  const stopRead = async () => {
    await _tsSdkReactNative.SubChannelRepository.stopMessageReceiptSync(channelId);
  };
  const getUserInfo = async userId => {
    const user = await (0, _userProvider.getAmityUser)(userId);
    return user;
  };
  (0, _react.useEffect)(() => {
    if (subChannelData && channelId) {
      startRead();
      const unsubscribe = _tsSdkReactNative.MessageRepository.getMessages({
        subChannelId: channelId,
        limit: 10,
        includeDeleted: true
      }, value => {
        const messages = value.data;

        // mark the last message as read
        if (messages.length > 0) {
          const lastMessage = messages[0];
          lastMessage.markRead();
        }
        setMessagesData(value);
        subscribeSubChannel(subChannelData);
      });
      disposers.push(() => unsubscribe);
    }
  }, [subChannelData]);
  const chatFormatter = async () => {
    if (messagesArr.length > 0) {
      const formattedMessages = await Promise.all(messagesArr.map(async item => {
        var _item$data;
        if (item !== null && item !== void 0 && (_item$data = item.data) !== null && _item$data !== void 0 && _item$data.fileId) {
          var _userObject$data, _userObject$data2;
          const {
            userObject
          } = await getUserInfo(item.creatorId);
          return {
            _id: item.messageId,
            text: '',
            image: `https://api.${apiRegion}.amity.co/api/v3/files/${(item === null || item === void 0 ? void 0 : item.data).fileId}/download` ?? undefined,
            createdAt: item.createdAt,
            editedAt: item.updatedAt,
            user: {
              _id: userObject.data.userId ?? '',
              name: (userObject === null || userObject === void 0 || (_userObject$data = userObject.data) === null || _userObject$data === void 0 ? void 0 : _userObject$data.displayName) ?? '',
              avatar: (userObject === null || userObject === void 0 || (_userObject$data2 = userObject.data) === null || _userObject$data2 === void 0 || (_userObject$data2 = _userObject$data2.avatar) === null || _userObject$data2 === void 0 ? void 0 : _userObject$data2.fileUrl) ?? ''
            },
            messageType: item.dataType,
            isDeleted: item.isDeleted
          };
        } else {
          var _item$data2, _userObject$data3, _userObject$data4;
          const {
            userObject
          } = await getUserInfo(item.creatorId);
          return {
            _id: item.messageId,
            text: (item === null || item === void 0 || (_item$data2 = item.data) === null || _item$data2 === void 0 ? void 0 : _item$data2.text) ?? '',
            createdAt: item.createdAt,
            editedAt: item.updatedAt,
            user: {
              _id: userObject.data.userId ?? '',
              name: (userObject === null || userObject === void 0 || (_userObject$data3 = userObject.data) === null || _userObject$data3 === void 0 ? void 0 : _userObject$data3.displayName) ?? '',
              avatar: (userObject === null || userObject === void 0 || (_userObject$data4 = userObject.data) === null || _userObject$data4 === void 0 || (_userObject$data4 = _userObject$data4.avatar) === null || _userObject$data4 === void 0 ? void 0 : _userObject$data4.fileUrl) ?? ''
            },
            messageType: item.dataType,
            isDeleted: item.isDeleted
          };
        }
      }));
      setMessages(formattedMessages);
    }
  };
  (0, _react.useEffect)(() => {
    chatFormatter();
  }, [messagesArr]);
  const handleSend = async () => {
    if (inputMessage.trim() === '') {
      return;
    }
    _reactNative.Keyboard.dismiss();
    const textMessage = {
      subChannelId: channelId,
      dataType: _tsSdkReactNative.MessageContentType.TEXT,
      data: {
        text: inputMessage
      }
    };
    const {
      data: message
    } = await _tsSdkReactNative.MessageRepository.createMessage(textMessage);
    if (message) {
      setInputMessage('');
      scrollToBottom();
    }
  };
  function handleBack() {
    disposers.forEach(fn => fn());
    stopRead();
  }
  const loadNextMessages = () => {
    if (flatListRef.current && hasNextPage && onNextPage) {
      onNextPage();
    }
  };
  (0, _react.useEffect)(() => {
    const sortedMessagesData = messages.sort((x, y) => {
      return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1;
    });
    const reOrderArr = sortedMessagesData;
    setSortedMessages([...reOrderArr]);
  }, [messages]);
  const openFullImage = (image, messageType) => {
    if (messageType === 'image' || messageType === 'file') {
      const fullSizeImage = image + '?size=full';
      setFullImage(fullSizeImage);
      setIsVisibleFullImage(true);
    }
  };
  const renderTimeDivider = date => {
    const currentDate = date;
    const formattedDate = (0, _moment.default)(currentDate).format('MMMM DD, YYYY');
    const today = (0, _moment.default)().startOf('day');
    let displayText = formattedDate;
    if ((0, _moment.default)(currentDate).isSame(today, 'day')) {
      displayText = 'Today';
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.bubbleDivider
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.textDivider
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.dateText
    }, displayText)));
  };
  const deleteMessage = async messageId => {
    const message = await _tsSdkReactNative.MessageRepository.softDeleteMessage(messageId);
    return message;
  };
  const reportMessage = async messageId => {
    const isFlagged = await _tsSdkReactNative.MessageRepository.flagMessage(messageId);
    if (isFlagged) {
      _reactNative.Alert.alert('Report sent ✅');
    }
  };
  const renderChatMessages = (message, index) => {
    var _message$user, _sortedMessages;
    const isUserChat = (message === null || message === void 0 || (_message$user = message.user) === null || _message$user === void 0 ? void 0 : _message$user._id) === client.userId;
    let isRenderDivider = false;
    const messageDate = (0, _moment.default)(message.createdAt);
    const previousMessageDate = (0, _moment.default)((_sortedMessages = sortedMessages[index + 1]) === null || _sortedMessages === void 0 ? void 0 : _sortedMessages.createdAt);
    const isSameDay = messageDate.isSame(previousMessageDate, 'day');
    if (!isSameDay || index === sortedMessages.length - 1) {
      isRenderDivider = true;
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, isRenderDivider && renderTimeDivider(message.createdAt), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: !isUserChat ? styles.leftMessageWrap : styles.rightMessageWrap
    }, !isUserChat && (message.user.avatar ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: message.user.avatar
      },
      style: styles.avatarImage
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.avatarImage
    }, /*#__PURE__*/_react.default.createElement(_AvatarIcon.AvatarIcon, null))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, !isUserChat && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: isUserChat ? styles.chatUserText : styles.chatFriendText
    }, message.user.name), message.isDeleted ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.deletedMessageContainer, isUserChat ? styles.userMessageDelete : styles.friendMessageDelete]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.deletedMessageRow
    }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgXml, {
      xml: _svgXmlList.deletedIcon,
      width: 20,
      height: 20
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.deletedMessage
    }, "Message Deleted", (0, _translate.default)('Cancel')))) : /*#__PURE__*/_react.default.createElement(_reactNativePopupMenu.Menu, null, /*#__PURE__*/_react.default.createElement(_reactNativePopupMenu.MenuTrigger, {
      onAlternativeAction: () => openFullImage(message.image, message.messageType),
      customStyles: {
        triggerTouchable: {
          underlayColor: 'transparent'
        }
      },
      triggerOnLongPress: true
    }, message.messageType === 'text' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: message._id,
      style: [styles.textChatBubble, isUserChat ? styles.userBubble : styles.friendBubble]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: isUserChat ? styles.chatUserText : styles.chatFriendText
    }, message.text)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.imageChatBubble, isUserChat ? styles.userImageBubble : styles.friendBubble]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.imageMessage,
      source: {
        uri: message.image + '?size=medium'
      }
    }))), /*#__PURE__*/_react.default.createElement(_reactNativePopupMenu.MenuOptions, {
      customStyles: {
        optionsContainer: {
          ...styles.optionsContainer,
          marginLeft: isUserChat ? 240 + (message.text && message.text.length < 5 ? message.text.length * 10 : 10) : 0
        }
      }
    }, isUserChat ? /*#__PURE__*/_react.default.createElement(_reactNativePopupMenu.MenuOption, {
      onSelect: () => _reactNative.Alert.alert('Delete this message?', `Message will be also be permanently removed from your friend's devices.`, [{
        text: (0, _translate.default)('Cancel'),
        style: 'cancel'
      }, {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMessage(message._id)
      }]),
      text: (0, _translate.default)('Delete')
    }) : /*#__PURE__*/_react.default.createElement(_reactNativePopupMenu.MenuOption, {
      onSelect: () => reportMessage(message._id),
      text: (0, _translate.default)('Report')
    }), message.messageType === 'text' && isUserChat && /*#__PURE__*/_react.default.createElement(_reactNativePopupMenu.MenuOption, {
      onSelect: () => {
        return openEditMessageModal(message._id, message.text);
      },
      text: (0, _translate.default)('Edit')
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.chatTimestamp, {
        alignSelf: isUserChat ? 'flex-end' : 'flex-start'
      }]
    }, message.createdAt != message.editedAt ? 'Edited ·' : '', ' ', (0, _moment.default)(message.createdAt != message.editedAt ? message.editedAt : message.createdAt).format('hh:mm A')))));
  };
  const handlePress = () => {
    _reactNative.Keyboard.dismiss();
    setIsExpanded(!isExpanded);
  };
  const scrollToBottom = () => {
    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToOffset({
        animated: true,
        offset: 0
      });
    }
  };
  const handleOnFocus = () => {
    setIsExpanded(false);
  };
  const pickCamera = async () => {
    const permissionCheck = await (0, _reactNativePermissions.request)(CameraLibraryPermissions[_reactNative.Platform.OS]);
    if (permissionCheck === _reactNativePermissions.RESULTS.LIMITED) {
      _reactNative.Alert.alert((0, _translate.default)('Permission required'), (0, _translate.default)('Please enable permissions to Camera.'), [{
        text: (0, _translate.default)('Cancel'),
        style: 'cancel'
      }, {
        text: 'Settings',
        onPress: () => _reactNative.Linking.openSettings()
      }]);
      return;
    } else if (permissionCheck !== _reactNativePermissions.RESULTS.GRANTED) {
      _reactNative.Alert.alert((0, _translate.default)('Permission Required'), (0, _translate.default)('Please enable permissions to Camera.'), [{
        text: (0, _translate.default)('Cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: (0, _translate.default)('Settings'),
        onPress: () => _reactNative.Linking.openSettings()
      }]);
      return;
    }
    const result = await (0, _reactNativeImagePicker.launchCamera)({
      mediaType: 'photo',
      quality: 1
    });
    if (result.assets && result.assets.length > 0 && result.assets[0] !== null && result.assets[0]) {
      upload({
        channelId,
        fileUri: result.assets[0].uri,
        type: _tsSdkReactNative.MessageContentType.IMAGE
      });
    }
  };
  const createImageMessage = async fileId => {
    if (fileId) {
      const imageMessage = {
        subChannelId: channelId,
        dataType: _tsSdkReactNative.MessageContentType.IMAGE,
        fileId: fileId
      };
      await _tsSdkReactNative.MessageRepository.createMessage(imageMessage);
    }
  };
  const handleOnFinishImage = async (fileId, originalPath) => {
    createImageMessage(fileId);
    setTimeout(() => {
      setDisplayImages(prevData => {
        const newData = prevData.filter(item => item.url !== originalPath); // Filter out objects containing the desired value
        return newData; // Update the state with the filtered array
      });
      setImageMultipleUri(prevData => {
        const newData = prevData.filter(url => url !== originalPath); // Filter out objects containing the desired value
        return newData; // Update the state with the filtered array
      });
    }, 0);
  };
  const pickImage = async () => {
    const permissionCheck = await (0, _reactNativePermissions.request)(PhotoLibraryPermissions[_reactNative.Platform.OS]);
    if (permissionCheck === _reactNativePermissions.RESULTS.LIMITED) {
      _reactNative.Alert.alert((0, _translate.default)('Permission required'), (0, _translate.default)('Please enable full access to Photo Library.'), [{
        text: (0, _translate.default)('Cancel'),
        style: 'cancel'
      }, {
        text: (0, _translate.default)('Settings'),
        onPress: () => _reactNative.Linking.openSettings()
      }]);
      return;
    } else if (permissionCheck !== _reactNativePermissions.RESULTS.GRANTED) {
      _reactNative.Alert.alert((0, _translate.default)('Permission required'), (0, _translate.default)('Please enable full access to Photo Library.'), [{
        text: (0, _translate.default)('Cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: (0, _translate.default)('Settings'),
        onPress: () => _reactNative.Linking.openSettings()
      }]);
      return;
    }
    const result = await (0, _reactNativeImagePicker.launchImageLibrary)({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 10
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImages = result.assets;
      selectedImages.forEach(image => upload({
        fileUri: image.uri,
        channelId,
        type: _tsSdkReactNative.MessageContentType.IMAGE
      }));
    }
  };
  const renderLoadingImages = (0, _react.useMemo)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.loadingImage
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      keyExtractor: (item, index) => item.fileUri + index,
      data: uploadList.filter(item => item.channelId === channelId),
      renderItem: ({
        item
      }) => /*#__PURE__*/_react.default.createElement(_BaseLoadingImage.default, {
        source: item.fileUri,
        progress: item.percent
      }),
      scrollEnabled: false,
      numColumns: 1
    }));
  }, [displayImages, handleOnFinishImage]);
  const openEditMessageModal = (messageId, text) => {
    setEditMessageId(messageId);
    setEditMessageModal(true);
    setEditMessageText(text);
  };
  const closeEditMessageModal = () => {
    setEditMessageId('');
    setEditMessageText('');
    setEditMessageModal(false);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.topBarContainer,
    edges: ['top']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.topBar
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.chatTitleWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleBack
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, {
    onPress: handleBack
  })), chatReceiver ? chatReceiver !== null && chatReceiver !== void 0 && chatReceiver.avatarFileId ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatar,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${chatReceiver === null || chatReceiver === void 0 ? void 0 : chatReceiver.avatarFileId}/download`
    }
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatar
  }, /*#__PURE__*/_react.default.createElement(_AvatarIcon.AvatarIcon, null)) : groupChatInfo !== null && groupChatInfo !== void 0 && groupChatInfo.avatarFileId ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatar,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.avatarFileId}/download`
    }
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.icon
  }, /*#__PURE__*/_react.default.createElement(_GroupChatIcon.GroupChatIcon, null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
    style: styles.chatName,
    numberOfLines: 1
  }, chatReceiver ? chatReceiver === null || chatReceiver === void 0 ? void 0 : chatReceiver.displayName : groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.displayName), groupChatInfo && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
    style: styles.chatMember
  }, groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.memberCount, " ", (0, _translate.default)('members')))), isResultReady && (!isVipUser || isVipUser && !((groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.memberCount) > 2)) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      navigation.navigate('ChatDetail', {
        channelId: channelId,
        channelType: chatReceiver ? 'conversation' : 'community',
        chatReceiver: chatReceiver ?? undefined,
        groupChat: groupChatInfo ?? undefined
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_MenuIcon.MenuIcon, {
    color: theme.colors.base
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.chatContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: sortedMessages,
    renderItem: ({
      item,
      index
    }) => renderChatMessages(item, index),
    keyExtractor: item => item._id,
    onEndReached: loadNextMessages,
    onEndReachedThreshold: 0.5,
    inverted: true,
    ref: flatListRef,
    ListHeaderComponent: renderLoadingImages
  })), canChat && /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
    style: styles.AllInputWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.InputWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: styles.input,
    value: inputMessage,
    onChangeText: text => setInputMessage(text),
    placeholder: "Type a message...",
    placeholderTextColor: theme.colors.baseShade3,
    onFocus: handleOnFocus
  }), inputMessage.trim().length > 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleSend,
    style: styles.sendIcon
  }, /*#__PURE__*/_react.default.createElement(_SendChatIcon.SendChatIcon, {
    color: theme.colors.primary
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handlePress,
    style: styles.sendIcon
  }, /*#__PURE__*/_react.default.createElement(_PlusIcon.PlusIcon, {
    color: theme.colors.base
  })))), isExpanded && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.expandedArea
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: pickCamera,
    style: {
      marginHorizontal: 30
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.IconCircle
  }, /*#__PURE__*/_react.default.createElement(_CameraBoldIcon.CameraBoldIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
    style: styles.iconText
  }, (0, _translate.default)('Camera'))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity
  // disabled={loadingImages.length > 0}
  , {
    onPress: pickImage,
    style: {
      marginHorizontal: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.IconCircle
  }, /*#__PURE__*/_react.default.createElement(_AlbumIcon.AlbumIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
    style: styles.iconText
  }, (0, _translate.default)('Album'))))), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
    images: [{
      uri: fullImage
    }],
    imageIndex: 0,
    visible: visibleFullImage,
    onRequestClose: () => setIsVisibleFullImage(false)
  }), /*#__PURE__*/_react.default.createElement(_EditMessageModal.default, {
    visible: editMessageModal,
    onClose: closeEditMessageModal,
    messageText: editMessageText,
    onFinishEdit: closeEditMessageModal,
    messageId: editMessageId
  }));
};
var _default = exports.default = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map