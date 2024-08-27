/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState, useRef, useContext } from 'react';
import { View, Image, LogBox, TouchableOpacity, TextInput, Platform, Text, KeyboardAvoidingView, FlatList, Keyboard, Alert, Linking } from 'react-native';
import ImageView from 'react-native-image-viewing';
import CustomText from '../../components/CustomText';
import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import moment from 'moment';
import { MessageContentType, MessageRepository, SubChannelRepository, getSubChannelTopic, subscribeTopic } from '@amityco/ts-sdk-react-native';
import useAuth from '../../hooks/useAuth';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { SvgXml } from 'react-native-svg';
import { deletedIcon } from '../../svg/svg-xml-list';
import EditMessageModal from '../../components/EditMessageModal';
import { GroupChatIcon } from '../../svg/GroupChatIcon';
import { AvatarIcon } from '../../svg/AvatarIcon';
import { CameraBoldIcon } from '../../svg/CameraBoldIcon';
import { MenuIcon } from '../../svg/MenuIcon';
import { PlusIcon } from '../../svg/PlusIcon';
import { SendChatIcon } from '../../svg/SendChatIcon';
import { AlbumIcon } from '../../svg/AlbumIcon';
import { useTheme } from 'react-native-paper';
import { getAmityUser } from '../../providers/user-provider';
import { useSelector } from 'react-redux';
import useIsRole from '../../hooks/useIsRole';
import useGoBackIfNotRelatedToChannel from '../../hooks/useGoBackIfNotRelatedToChannel';
import useCanChat from '../../hooks/useCanChat';
import { FileMessegeUploadContext } from '../../providers/file-message-upload-provider';
import BaseLoadingImage from '../../components/BaseLoadingImage';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import translate from '../../translate/translate';
const CameraLibraryPermissions = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA
};
const PhotoLibraryPermissions = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: Platform.constants["Release"] >= 13 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
};
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const ChatRoom = ({
  route
}) => {
  const [isVipUser, isResultReady] = useIsRole('vipUser');
  const {
    channelList
  } = useSelector(state => state.recentChat);
  const styles = useStyles();
  const navigation = useNavigation();
  let {
    chatReceiver,
    groupChat,
    channelId
  } = route.params;
  const {
    client,
    apiRegion
  } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messagesData, setMessagesData] = useState();
  const [imageMultipleUri, setImageMultipleUri] = useState([]);
  useEffect(() => {
    console.log(imageMultipleUri);
  }, [imageMultipleUri]);
  const theme = useTheme();
  const {
    data: messagesArr = [],
    onNextPage,
    hasNextPage
  } = messagesData ?? {};
  const [groupChatInfo, setGroupChatInfo] = useState({
    ...groupChat
  });
  const canChat = useCanChat(channelId);
  useGoBackIfNotRelatedToChannel(channelId);
  const [inputMessage, setInputMessage] = useState('');
  const [sortedMessages, setSortedMessages] = useState([]);
  const flatListRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleFullImage, setIsVisibleFullImage] = useState(false);
  const [fullImage, setFullImage] = useState('');
  const [subChannelData, setSubChannelData] = useState();
  const [displayImages, setDisplayImages] = useState([]);
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [editMessageId, setEditMessageId] = useState('');
  const [editMessageText, setEditMessageText] = useState('');
  const {
    upload,
    uploadList
  } = useContext(FileMessegeUploadContext);
  const disposers = [];
  const subscribeSubChannel = subChannel => disposers.push(subscribeTopic(getSubChannelTopic(subChannel)));
  useEffect(() => {
    const currentChannel = channelList.find(item => item.chatId === channelId);
    setGroupChatInfo({
      displayName: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.chatName,
      avatarFileId: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.avatarFileId,
      memberCount: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.chatMemberNumber
    });
  }, [channelList]);
  useEffect(() => {
    if (channelId) {
      SubChannelRepository.getSubChannel(channelId, ({
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
    await SubChannelRepository.startMessageReceiptSync(channelId);
  };
  const stopRead = async () => {
    await SubChannelRepository.stopMessageReceiptSync(channelId);
  };
  const getUserInfo = async userId => {
    const user = await getAmityUser(userId);
    return user;
  };
  useEffect(() => {
    if (subChannelData && channelId) {
      startRead();
      const unsubscribe = MessageRepository.getMessages({
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
  useEffect(() => {
    chatFormatter();
  }, [messagesArr]);
  const handleSend = async () => {
    if (inputMessage.trim() === '') {
      return;
    }
    Keyboard.dismiss();
    const textMessage = {
      subChannelId: channelId,
      dataType: MessageContentType.TEXT,
      data: {
        text: inputMessage
      }
    };
    const {
      data: message
    } = await MessageRepository.createMessage(textMessage);
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
  useEffect(() => {
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
    const formattedDate = moment(currentDate).format('MMMM DD, YYYY');
    const today = moment().startOf('day');
    let displayText = formattedDate;
    if (moment(currentDate).isSame(today, 'day')) {
      displayText = 'Today';
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.bubbleDivider
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.textDivider
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.dateText
    }, displayText)));
  };
  const deleteMessage = async messageId => {
    const message = await MessageRepository.softDeleteMessage(messageId);
    return message;
  };
  const reportMessage = async messageId => {
    const isFlagged = await MessageRepository.flagMessage(messageId);
    if (isFlagged) {
      Alert.alert('Report sent ✅');
    }
  };
  const renderChatMessages = (message, index) => {
    var _message$user, _sortedMessages;
    const isUserChat = (message === null || message === void 0 || (_message$user = message.user) === null || _message$user === void 0 ? void 0 : _message$user._id) === client.userId;
    let isRenderDivider = false;
    const messageDate = moment(message.createdAt);
    const previousMessageDate = moment((_sortedMessages = sortedMessages[index + 1]) === null || _sortedMessages === void 0 ? void 0 : _sortedMessages.createdAt);
    const isSameDay = messageDate.isSame(previousMessageDate, 'day');
    if (!isSameDay || index === sortedMessages.length - 1) {
      isRenderDivider = true;
    }
    return /*#__PURE__*/React.createElement(View, null, isRenderDivider && renderTimeDivider(message.createdAt), /*#__PURE__*/React.createElement(View, {
      style: !isUserChat ? styles.leftMessageWrap : styles.rightMessageWrap
    }, !isUserChat && (message.user.avatar ? /*#__PURE__*/React.createElement(Image, {
      source: {
        uri: message.user.avatar
      },
      style: styles.avatarImage
    }) : /*#__PURE__*/React.createElement(View, {
      style: styles.avatarImage
    }, /*#__PURE__*/React.createElement(AvatarIcon, null))), /*#__PURE__*/React.createElement(View, null, !isUserChat && /*#__PURE__*/React.createElement(Text, {
      style: isUserChat ? styles.chatUserText : styles.chatFriendText
    }, message.user.name), message.isDeleted ? /*#__PURE__*/React.createElement(View, {
      style: [styles.deletedMessageContainer, isUserChat ? styles.userMessageDelete : styles.friendMessageDelete]
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.deletedMessageRow
    }, /*#__PURE__*/React.createElement(SvgXml, {
      xml: deletedIcon,
      width: 20,
      height: 20
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.deletedMessage
    }, "Message Deleted", translate('Cancel')))) : /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(MenuTrigger, {
      onAlternativeAction: () => openFullImage(message.image, message.messageType),
      customStyles: {
        triggerTouchable: {
          underlayColor: 'transparent'
        }
      },
      triggerOnLongPress: true
    }, message.messageType === 'text' ? /*#__PURE__*/React.createElement(View, {
      key: message._id,
      style: [styles.textChatBubble, isUserChat ? styles.userBubble : styles.friendBubble]
    }, /*#__PURE__*/React.createElement(Text, {
      style: isUserChat ? styles.chatUserText : styles.chatFriendText
    }, message.text)) : /*#__PURE__*/React.createElement(View, {
      style: [styles.imageChatBubble, isUserChat ? styles.userImageBubble : styles.friendBubble]
    }, /*#__PURE__*/React.createElement(Image, {
      style: styles.imageMessage,
      source: {
        uri: message.image + '?size=medium'
      }
    }))), /*#__PURE__*/React.createElement(MenuOptions, {
      customStyles: {
        optionsContainer: {
          ...styles.optionsContainer,
          marginLeft: isUserChat ? 240 + (message.text && message.text.length < 5 ? message.text.length * 10 : 10) : 0
        }
      }
    }, isUserChat ? /*#__PURE__*/React.createElement(MenuOption, {
      onSelect: () => Alert.alert('Delete this message?', `Message will be also be permanently removed from your friend's devices.`, [{
        text: translate('Cancel'),
        style: 'cancel'
      }, {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMessage(message._id)
      }]),
      text: translate('Delete')
    }) : /*#__PURE__*/React.createElement(MenuOption, {
      onSelect: () => reportMessage(message._id),
      text: translate('Report')
    }), message.messageType === 'text' && isUserChat && /*#__PURE__*/React.createElement(MenuOption, {
      onSelect: () => {
        return openEditMessageModal(message._id, message.text);
      },
      text: translate('Edit')
    }))), /*#__PURE__*/React.createElement(Text, {
      style: [styles.chatTimestamp, {
        alignSelf: isUserChat ? 'flex-end' : 'flex-start'
      }]
    }, message.createdAt != message.editedAt ? 'Edited ·' : '', ' ', moment(message.createdAt != message.editedAt ? message.editedAt : message.createdAt).format('hh:mm A')))));
  };
  const handlePress = () => {
    Keyboard.dismiss();
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
    const permissionCheck = await request(CameraLibraryPermissions[Platform.OS]);
    if (permissionCheck === RESULTS.LIMITED) {
      Alert.alert(translate('Permission required'), translate('Please enable permissions to Camera.'), [{
        text: translate('Cancel'),
        style: 'cancel'
      }, {
        text: 'Settings',
        onPress: () => Linking.openSettings()
      }]);
      return;
    } else if (permissionCheck !== RESULTS.GRANTED) {
      Alert.alert(translate('Permission Required'), translate('Please enable permissions to Camera.'), [{
        text: translate('Cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: translate('Settings'),
        onPress: () => Linking.openSettings()
      }]);
      return;
    }
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1
    });
    if (result.assets && result.assets.length > 0 && result.assets[0] !== null && result.assets[0]) {
      upload({
        channelId,
        fileUri: result.assets[0].uri,
        type: MessageContentType.IMAGE
      });
    }
  };
  const createImageMessage = async fileId => {
    if (fileId) {
      const imageMessage = {
        subChannelId: channelId,
        dataType: MessageContentType.IMAGE,
        fileId: fileId
      };
      await MessageRepository.createMessage(imageMessage);
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
    const permissionCheck = await request(PhotoLibraryPermissions[Platform.OS]);
    if (permissionCheck === RESULTS.LIMITED) {
      Alert.alert(translate('Permission required'), translate('Please enable full access to Photo Library.'), [{
        text: translate('Cancel'),
        style: 'cancel'
      }, {
        text: translate('Settings'),
        onPress: () => Linking.openSettings()
      }]);
      return;
    } else if (permissionCheck !== RESULTS.GRANTED) {
      Alert.alert(translate('Permission required'), translate('Please enable full access to Photo Library.'), [{
        text: translate('Cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: translate('Settings'),
        onPress: () => Linking.openSettings()
      }]);
      return;
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 10
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImages = result.assets;
      selectedImages.forEach(image => upload({
        fileUri: image.uri,
        channelId,
        type: MessageContentType.IMAGE
      }));
    }
  };
  const renderLoadingImages = useMemo(() => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.loadingImage
    }, /*#__PURE__*/React.createElement(FlatList, {
      keyExtractor: (item, index) => item.fileUri + index,
      data: uploadList.filter(item => item.channelId === channelId),
      renderItem: ({
        item
      }) => /*#__PURE__*/React.createElement(BaseLoadingImage, {
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.topBarContainer,
    edges: ['top']
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.topBar
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.chatTitleWrap
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleBack
  }, /*#__PURE__*/React.createElement(BackButton, {
    onPress: handleBack
  })), chatReceiver ? chatReceiver !== null && chatReceiver !== void 0 && chatReceiver.avatarFileId ? /*#__PURE__*/React.createElement(Image, {
    style: styles.avatar,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${chatReceiver === null || chatReceiver === void 0 ? void 0 : chatReceiver.avatarFileId}/download`
    }
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.avatar
  }, /*#__PURE__*/React.createElement(AvatarIcon, null)) : groupChatInfo !== null && groupChatInfo !== void 0 && groupChatInfo.avatarFileId ? /*#__PURE__*/React.createElement(Image, {
    style: styles.avatar,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.avatarFileId}/download`
    }
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.icon
  }, /*#__PURE__*/React.createElement(GroupChatIcon, null)), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(CustomText, {
    style: styles.chatName,
    numberOfLines: 1
  }, chatReceiver ? chatReceiver === null || chatReceiver === void 0 ? void 0 : chatReceiver.displayName : groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.displayName), groupChatInfo && /*#__PURE__*/React.createElement(CustomText, {
    style: styles.chatMember
  }, groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.memberCount, " ", translate('members')))), isResultReady && (!isVipUser || isVipUser && !((groupChatInfo === null || groupChatInfo === void 0 ? void 0 : groupChatInfo.memberCount) > 2)) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      navigation.navigate('ChatDetail', {
        channelId: channelId,
        channelType: chatReceiver ? 'conversation' : 'community',
        chatReceiver: chatReceiver ?? undefined,
        groupChat: groupChatInfo ?? undefined
      });
    }
  }, /*#__PURE__*/React.createElement(MenuIcon, {
    color: theme.colors.base
  })))), /*#__PURE__*/React.createElement(View, {
    style: styles.chatContainer
  }, /*#__PURE__*/React.createElement(FlatList, {
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
  })), canChat && /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    style: styles.AllInputWrap
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.InputWrap
  }, /*#__PURE__*/React.createElement(TextInput, {
    style: styles.input,
    value: inputMessage,
    onChangeText: text => setInputMessage(text),
    placeholder: "Type a message...",
    placeholderTextColor: theme.colors.baseShade3,
    onFocus: handleOnFocus
  }), inputMessage.trim().length > 0 ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleSend,
    style: styles.sendIcon
  }, /*#__PURE__*/React.createElement(SendChatIcon, {
    color: theme.colors.primary
  })) : /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handlePress,
    style: styles.sendIcon
  }, /*#__PURE__*/React.createElement(PlusIcon, {
    color: theme.colors.base
  })))), isExpanded && /*#__PURE__*/React.createElement(View, {
    style: styles.expandedArea
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: pickCamera,
    style: {
      marginHorizontal: 30
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.IconCircle
  }, /*#__PURE__*/React.createElement(CameraBoldIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/React.createElement(CustomText, {
    style: styles.iconText
  }, translate('Camera'))), /*#__PURE__*/React.createElement(TouchableOpacity
  // disabled={loadingImages.length > 0}
  , {
    onPress: pickImage,
    style: {
      marginHorizontal: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.IconCircle
  }, /*#__PURE__*/React.createElement(AlbumIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/React.createElement(CustomText, {
    style: styles.iconText
  }, translate('Album'))))), /*#__PURE__*/React.createElement(ImageView, {
    images: [{
      uri: fullImage
    }],
    imageIndex: 0,
    visible: visibleFullImage,
    onRequestClose: () => setIsVisibleFullImage(false)
  }), /*#__PURE__*/React.createElement(EditMessageModal, {
    visible: editMessageModal,
    onClose: closeEditMessageModal,
    messageText: editMessageText,
    onFinishEdit: closeEditMessageModal,
    messageId: editMessageId
  }));
};
export default ChatRoom;
//# sourceMappingURL=ChatRoom.js.map