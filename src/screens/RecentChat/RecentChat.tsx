import React, { type ReactElement, useMemo, useRef } from 'react';

import { View, FlatList, TouchableOpacity } from 'react-native';

import {
  ChannelRepository,
  getChannelTopic,
  subscribeTopic,
} from '@amityco/ts-sdk-react-native';
import ChatList, {
  type IChatListProps,
  type IGroupChatObject,
} from '../../components/ChatList/index';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { useStyles } from './styles';
import CustomText from '../../components/CustomText';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import AddMembersModal from '../../components/AddMembersModal';
import type { UserInterface } from '../../types/user.interface';
import { createAmityChannel } from '../../providers/channel-provider';
import { AddChatIcon } from '../../svg/AddChat';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import recentChatSlice from '../../redux/slices/RecentChatSlice';
import useIsRole from '../../hooks/useIsRole';
import translate from '../../translate/translate';

export default function RecentChat() {
  const { client, isConnected } = useAuth();
  const { channelList } = useSelector((state: RootState) => state.recentChat);

  const { updateRecentChat, clearChannelList } = recentChatSlice.actions;
  const dispatch = useDispatch();

  const theme = useTheme() as MyMD3Theme;
  const [loadChannel, setLoadChannel] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const styles = useStyles();

  const flatListRef = useRef(null);

  const [channelData, setChannelData] =
    useState<Amity.LiveCollection<Amity.Channel>>();

  const [isCSRole, isFetchedRole] = useIsRole('customerService');
  const canCreateChannel = useMemo(
    () => isFetchedRole && isCSRole,
    [isFetchedRole, isCSRole]
  );

  const { data: channels = [], onNextPage, hasNextPage } = channelData ?? {};
  const disposers: Amity.Unsubscriber[] = [];
  const subscribedChannels: Amity.Channel['channelId'][] = [];

  const subscribeChannels = (channels: Amity.Channel[]) =>
    channels.forEach((c) => {
      if (!subscribedChannels.includes(c.channelId) && !c.isDeleted) {
        subscribedChannels.push(c.channelId);

        disposers.push(subscribeTopic(getChannelTopic(c)));
      }
    });

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.topBar}>
          <CustomText style={styles.titleText}>{translate('Chat')}</CustomText>
          {canCreateChannel && (
            <TouchableOpacity
              onPress={() => {
                if (!canCreateChannel) return;

                setIsModalVisible(true);
              }}
            >
              <AddChatIcon color={theme.colors.base} />
            </TouchableOpacity>
          )}
        </View>
      ),
      headerTitle: '',
    });
  }, [canCreateChannel]);

  const onQueryChannel = () => {
    const unsubscribe = ChannelRepository.getChannels(
      { sortBy: 'lastActivity', limit: 15, membership: 'member' },
      (value) => {
        setChannelData(value);
        subscribeChannels(channels);
        if (value.data.length === 0) {
          setLoadChannel(false);
        }
      }
    );
    disposers.push(unsubscribe);
  };

  const isFocus = useIsFocused();

  useEffect(() => {
    onQueryChannel();
    return () => {
      disposers.forEach((fn) => fn());
    };
  }, [isConnected, isFocus]);

  useEffect(() => {
    if (channels.length > 0) {
      const formattedChannelObjects: IChatListProps[] = channels.map(
        (item: Amity.Channel<any>) => {
          const lastActivityDate: string = moment(item.lastActivity).format(
            'DD/MM/YYYY'
          );
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
            avatarFileId: item.avatarFileId,
          };
        }
      );
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

  const handleOnFinish = async (users: UserInterface[]) => {
    const channel = await createAmityChannel(
      (client as Amity.Client).userId as string,
      users
    );
    if (channel) {
      try {
        if (users.length === 1 && users[0]) {
          const oneOnOneChatObject: UserInterface = {
            userId: users[0].userId,
            displayName: users[0].displayName as string,
            avatarFileId: users[0].avatarFileId as string,
          };

          navigation.navigate('ChatRoom', {
            channelId: channel.channelId,
            chatReceiver: oneOnOneChatObject,
          });
        } else if (users.length > 1) {
          const chatDisplayName = users.map((item) => item.displayName);
          const userObject = users.map((item: UserInterface) => {
            return {
              userId: item.userId,
              displayName: item.displayName,
              avatarFileId: item.avatarFileId,
            };
          });
          const groupChatObject: IGroupChatObject = {
            displayName: chatDisplayName.join(','),
            users: userObject,
            memberCount: channel.memberCount as number,
            avatarFileId: channel.avatarFileId,
          };

          navigation.navigate('ChatRoom', {
            channelId: channel.channelId,
            groupChat: groupChatObject,
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
    if(loadChannel){
      return (
        <View style={{ marginTop: 20 }}>
          <LoadingIndicator />
        </View>
      )
    }

    if(channelList && channelList.length <= 0){
      return (
        <View style={styles.NoConversationContainer}>
          <CustomText style={styles.NoConversationText}>
            {translate('No Conversation')}
          </CustomText>
        </View>
      )
    }
    
    return (
      <View style={styles.chatListContainer}>
        <FlatList
          data={channelList}
          renderItem={({ item }) => renderChatList(item)}
          keyExtractor={(item) => item.chatId.toString() + item?.avatarFileId}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ref={flatListRef}
          extraData={channelList}
        />
      </View>
    );
  }, [loadChannel, channelList, handleLoadMore]);

  const renderChatList = (item: IChatListProps): ReactElement => {
    return (
      <ChatList
        key={item.chatId}
        chatId={item.chatId}
        chatName={item.chatName}
        chatMemberNumber={item.chatMemberNumber}
        unReadMessage={item.unReadMessage}
        messageDate={item.messageDate}
        channelType={item.channelType}
        avatarFileId={item.avatarFileId}
      />
    );
  };
  const renderTabView = (): ReactElement => {
    return (
      <View style={styles.tabView}>
        <View style={styles.indicator}>
          <CustomText style={styles.tabViewTitle}>{translate('Recent')}</CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.chatContainer}>
      {renderTabView()}
      {renderRecentChat}
      {canCreateChannel && (
        <AddMembersModal
          onFinish={handleOnFinish}
          onClose={handleCloseModal}
          visible={isModalVisible}
        />
      )}
    </View>
  );
}
