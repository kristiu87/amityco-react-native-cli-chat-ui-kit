import React, { useMemo, useRef } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { ChannelRepository, getChannelTopic, subscribeTopic } from '@amityco/ts-sdk-react-native';
import ChatList from '../../components/ChatList/index';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useStyles } from './styles';
import CustomText from '../../components/CustomText';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import AddMembersModal from '../../components/AddMembersModal';
import { createAmityChannel } from '../../providers/channel-provider';
import { AddChatIcon } from '../../svg/AddChat';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import recentChatSlice from '../../redux/slices/RecentChatSlice';
import useIsRole from '../../hooks/useIsRole';
import translate from '../../translate/translate';
export default function RecentChat() {
  const {
    client,
    isConnected
  } = useAuth();
  const {
    channelList
  } = useSelector(state => state.recentChat);
  const {
    updateRecentChat,
    clearChannelList
  } = recentChatSlice.actions;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loadChannel, setLoadChannel] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const styles = useStyles();
  const flatListRef = useRef(null);
  const [channelData, setChannelData] = useState();
  const [isCSRole, isFetchedRole] = useIsRole('customerService');
  const canCreateChannel = useMemo(() => isFetchedRole && isCSRole, [isFetchedRole, isCSRole]);
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
      disposers.push(subscribeTopic(getChannelTopic(c)));
    }
  });
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      header: () => /*#__PURE__*/React.createElement(View, {
        style: styles.topBar
      }, /*#__PURE__*/React.createElement(CustomText, {
        style: styles.titleText
      }, translate('Chat')), canCreateChannel && /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => {
          if (!canCreateChannel) return;
          setIsModalVisible(true);
        }
      }, /*#__PURE__*/React.createElement(AddChatIcon, {
        color: theme.colors.base
      }))),
      headerTitle: ''
    });
  }, [canCreateChannel]);
  const onQueryChannel = () => {
    const unsubscribe = ChannelRepository.getChannels({
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
  const isFocus = useIsFocused();
  useEffect(() => {
    onQueryChannel();
    return () => {
      disposers.forEach(fn => fn());
    };
  }, [isConnected, isFocus]);
  useEffect(() => {
    if (channels.length > 0) {
      const formattedChannelObjects = channels.map(item => {
        const lastActivityDate = moment(item.lastActivity).format('DD/MM/YYYY');
        const todayDate = moment(Date.now()).format('DD/MM/YYYY');
        let dateDisplay;
        if (lastActivityDate === todayDate) {
          dateDisplay = moment(item.lastActivity).format('hh:mm A');
        } else {
          dateDisplay = moment(item.lastActivity).format('DD/MM/YYYY');
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
    const channel = await createAmityChannel(client.userId, users);
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
  const renderRecentChat = useMemo(() => {
    if (loadChannel) {
      return /*#__PURE__*/React.createElement(View, {
        style: {
          marginTop: 20
        }
      }, /*#__PURE__*/React.createElement(LoadingIndicator, null));
    }
    if (channelList && channelList.length <= 0) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.NoConversationContainer
      }, /*#__PURE__*/React.createElement(CustomText, {
        style: styles.NoConversationText
      }, translate('No Conversation')));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.chatListContainer
    }, /*#__PURE__*/React.createElement(FlatList, {
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
    return /*#__PURE__*/React.createElement(ChatList, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.tabView
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.indicator
    }, /*#__PURE__*/React.createElement(CustomText, {
      style: styles.tabViewTitle
    }, translate('Recent'))));
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.chatContainer
  }, renderTabView(), renderRecentChat, canCreateChannel && /*#__PURE__*/React.createElement(AddMembersModal, {
    onFinish: handleOnFinish,
    onClose: handleCloseModal,
    visible: isModalVisible
  }));
}
//# sourceMappingURL=RecentChat.js.map