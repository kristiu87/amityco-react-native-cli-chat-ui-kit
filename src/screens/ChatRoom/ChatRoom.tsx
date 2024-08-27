/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState, useRef, useContext } from 'react';
import {
  View,
  Image,
  LogBox,
  TouchableOpacity,
  TextInput,
  Platform,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Alert,
  Linking,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import CustomText from '../../components/CustomText';
import { useStyles } from './styles';
import { type RouteProp, useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../routes/RouteParamList';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../components/BackButton';
import moment from 'moment';
import {
  MessageContentType,
  MessageRepository,
  SubChannelRepository,
  getSubChannelTopic,
  subscribeTopic,
} from '@amityco/ts-sdk-react-native';
import useAuth from '../../hooks/useAuth';

import ImagePicker, {
  launchImageLibrary,
  type Asset,
  launchCamera,
} from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
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
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { getAmityUser } from '../../providers/user-provider';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IGroupChatObject } from '~/components/ChatList';
import useIsRole from '../../hooks/useIsRole';
import useGoBackIfNotRelatedToChannel from '../../hooks/useGoBackIfNotRelatedToChannel';
import useCanChat from '../../hooks/useCanChat';
import { FileMessegeUploadContext } from '../../providers/file-message-upload-provider';
import BaseLoadingImage from '../../components/BaseLoadingImage';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import translate from '../../translate/translate'

const CameraLibraryPermissions = {
	ios: PERMISSIONS.IOS.CAMERA,
	android: PERMISSIONS.ANDROID.CAMERA 
}

const PhotoLibraryPermissions = {
	ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
	android: Platform.constants["Release"] >=  13 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
}

type ChatRoomScreenComponentType = React.FC<{
  route: RouteProp<RootStackParamList, 'ChatRoom'>;
  navigation: StackNavigationProp<RootStackParamList, 'ChatRoom'>;
}>;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

interface IMessage {
  _id: string;
  text?: string;
  createdAt: string;
  editedAt: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  image?: string;
  messageType: string;
  isPending?: boolean;
  isDeleted: boolean;
}
export interface IDisplayImage {
  url: string;
  fileId: string | undefined;
  fileName: string;
  isUploaded: boolean;
  thumbNail?: string;
}
const ChatRoom: ChatRoomScreenComponentType = ({ route }) => {
  const [isVipUser, isResultReady] = useIsRole('vipUser');

  const { channelList } = useSelector((state: RootState) => state.recentChat);

  const styles = useStyles();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  let { chatReceiver, groupChat, channelId } = route.params;

  const { client, apiRegion } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messagesData, setMessagesData] =
    useState<Amity.LiveCollection<Amity.Message>>();
  const [imageMultipleUri, setImageMultipleUri] = useState<string[]>([]);
  useEffect(() => {
    console.log(imageMultipleUri);
  }, [imageMultipleUri]);
  const theme = useTheme() as MyMD3Theme;

  const {
    data: messagesArr = [],
    onNextPage,
    hasNextPage,
  } = messagesData ?? {};

  const [groupChatInfo, setGroupChatInfo] = useState<IGroupChatObject>({
    ...groupChat,
  });

  const canChat = useCanChat(channelId);
  useGoBackIfNotRelatedToChannel(channelId);

  const [inputMessage, setInputMessage] = useState('');
  const [sortedMessages, setSortedMessages] = useState<IMessage[]>([]);
  const flatListRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleFullImage, setIsVisibleFullImage] = useState<boolean>(false);
  const [fullImage, setFullImage] = useState<string>('');
  const [subChannelData, setSubChannelData] = useState<Amity.SubChannel>();
  const [displayImages, setDisplayImages] = useState<IDisplayImage[]>([]);
  const [editMessageModal, setEditMessageModal] = useState<boolean>(false);
  const [editMessageId, setEditMessageId] = useState<string>('');
  const [editMessageText, setEditMessageText] = useState<string>('');
  const { upload, uploadList } = useContext(FileMessegeUploadContext);
  const disposers: Amity.Unsubscriber[] = [];

  const subscribeSubChannel = (subChannel: Amity.SubChannel) =>
    disposers.push(subscribeTopic(getSubChannelTopic(subChannel)));

  useEffect(() => {
    const currentChannel = channelList.find(
      (item) => item.chatId === channelId
    );
    setGroupChatInfo({
      displayName: currentChannel?.chatName,
      avatarFileId: currentChannel?.avatarFileId,
      memberCount: currentChannel?.chatMemberNumber,
    });
  }, [channelList]);

  useEffect(() => {
    if (channelId) {
      SubChannelRepository.getSubChannel(channelId, ({ data: subChannel }) => {
        setSubChannelData(subChannel);
      });
    }
    return () => {
      disposers.forEach((fn) => fn());
      stopRead();
    };
  }, [channelId]);

  const startRead = async () => {
    await SubChannelRepository.startMessageReceiptSync(channelId);
  };
  const stopRead = async () => {
    await SubChannelRepository.stopMessageReceiptSync(channelId);
  };

  const getUserInfo = async (userId: string) => {
    const user = await getAmityUser(userId);
    return user;
  };

  useEffect(() => {
    if (subChannelData && channelId) {
      startRead();

      const unsubscribe = MessageRepository.getMessages(
        { subChannelId: channelId, limit: 10, includeDeleted: true },
        (value) => {
          const messages = value.data;

          // mark the last message as read
          if (messages.length > 0) {
            const lastMessage = messages[0];
            lastMessage.markRead();
          }
          setMessagesData(value);
          subscribeSubChannel(subChannelData as Amity.SubChannel);
        }
      );
      disposers.push(() => unsubscribe);
    }
  }, [subChannelData]);

  const chatFormatter = async () => {
    if (messagesArr.length > 0) {
      const formattedMessages = await Promise.all(
        messagesArr.map(async (item) => {
          if ((item?.data as Record<string, any>)?.fileId) {
            const { userObject } = await getUserInfo(item.creatorId);

            return {
              _id: item.messageId,
              text: '',
              image:
                `https://api.${apiRegion}.amity.co/api/v3/files/${
                  (item?.data as Record<string, any>).fileId
                }/download` ?? undefined,
              createdAt: item.createdAt as string,
              editedAt: item.updatedAt as string,
              user: {
                _id: userObject.data.userId ?? '',
                name: userObject?.data?.displayName ?? '',
                avatar: userObject?.data?.avatar?.fileUrl ?? '',
              },
              messageType: item.dataType,
              isDeleted: item.isDeleted as boolean,
            };
          } else {
            const { userObject } = await getUserInfo(item.creatorId);

            return {
              _id: item.messageId,
              text:
                ((item?.data as Record<string, string>)?.text as string) ?? '',
              createdAt: item.createdAt as string,
              editedAt: item.updatedAt as string,
              user: {
                _id: userObject.data.userId ?? '',
                name: userObject?.data?.displayName ?? '',
                avatar: userObject?.data?.avatar?.fileUrl ?? '',
              },
              messageType: item.dataType,
              isDeleted: item.isDeleted as boolean,
            };
          }
        })
      );
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
        text: inputMessage,
      },
    };

    const { data: message } =
      await MessageRepository.createMessage(textMessage);
    if (message) {
      setInputMessage('');
      scrollToBottom();
    }
  };

  function handleBack(): void {
    disposers.forEach((fn) => fn());
    stopRead();
  }

  const loadNextMessages = () => {
    if (flatListRef.current && hasNextPage && onNextPage) {
      onNextPage();
    }
  };

  useEffect(() => {
    const sortedMessagesData: IMessage[] = messages.sort((x, y) => {
      return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1;
    });
    const reOrderArr = sortedMessagesData;
    setSortedMessages([...reOrderArr]);
  }, [messages]);

  const openFullImage = (image: string, messageType: string) => {
    if (messageType === 'image' || messageType === 'file') {
      const fullSizeImage: string = image + '?size=full';
      setFullImage(fullSizeImage);
      setIsVisibleFullImage(true);
    }
  };

  const renderTimeDivider = (date: string) => {
    const currentDate = date;
    const formattedDate = moment(currentDate).format('MMMM DD, YYYY');
    const today = moment().startOf('day');

    let displayText = formattedDate;

    if (moment(currentDate).isSame(today, 'day')) {
      displayText = 'Today';
    }

    return (
      <View style={styles.bubbleDivider}>
        <View style={styles.textDivider}>
          <Text style={styles.dateText}>{displayText}</Text>
        </View>
      </View>
    );
  };

  const deleteMessage = async (messageId: string) => {
    const message = await MessageRepository.softDeleteMessage(messageId);
    return message;
  };

  const reportMessage = async (messageId: string) => {
    const isFlagged = await MessageRepository.flagMessage(messageId);
    if (isFlagged) {
      Alert.alert('Report sent ✅');
    }
  };

  const renderChatMessages = (message: IMessage, index: number) => {
    const isUserChat: boolean =
      message?.user?._id === (client as Amity.Client).userId;
    let isRenderDivider = false;
    const messageDate = moment(message.createdAt);

    const previousMessageDate = moment(sortedMessages[index + 1]?.createdAt);
    const isSameDay = messageDate.isSame(previousMessageDate, 'day');

    if (!isSameDay || index === sortedMessages.length - 1) {
      isRenderDivider = true;
    }

    return (
      <View>
        {isRenderDivider && renderTimeDivider(message.createdAt)}
        <View
          style={!isUserChat ? styles.leftMessageWrap : styles.rightMessageWrap}
        >
          {!isUserChat &&
            (message.user.avatar ? (
              <Image
                source={{ uri: message.user.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarImage}>
                <AvatarIcon />
              </View>
            ))}

          <View>
            {!isUserChat && (
              <Text
                style={isUserChat ? styles.chatUserText : styles.chatFriendText}
              >
                {message.user.name}
              </Text>
            )}
            {message.isDeleted ? (
              <View
                style={[
                  styles.deletedMessageContainer,
                  isUserChat
                    ? styles.userMessageDelete
                    : styles.friendMessageDelete,
                ]}
              >
                <View style={styles.deletedMessageRow}>
                  <SvgXml xml={deletedIcon} width={20} height={20} />
                  <Text style={styles.deletedMessage}>Message Deleted{translate('Cancel')}</Text>
                </View>
              </View>
            ) : (
              <Menu>
                <MenuTrigger
                  onAlternativeAction={() =>
                    openFullImage(message.image as string, message.messageType)
                  }
                  customStyles={{
                    triggerTouchable: { underlayColor: 'transparent' },
                  }}
                  triggerOnLongPress
                >
                  {message.messageType === 'text' ? (
                    <View
                      key={message._id}
                      style={[
                        styles.textChatBubble,
                        isUserChat ? styles.userBubble : styles.friendBubble,
                      ]}
                    >
                      <Text
                        style={
                          isUserChat
                            ? styles.chatUserText
                            : styles.chatFriendText
                        }
                      >
                        {message.text}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.imageChatBubble,
                        isUserChat
                          ? styles.userImageBubble
                          : styles.friendBubble,
                      ]}
                    >
                      <Image
                        style={styles.imageMessage}
                        source={{
                          uri: message.image + '?size=medium',
                        }}
                      />
                    </View>
                  )}
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionsContainer: {
                      ...styles.optionsContainer,
                      marginLeft: isUserChat
                        ? 240 +
                          (message.text && message.text.length < 5
                            ? message.text.length * 10
                            : 10)
                        : 0,
                    },
                  }}
                >
                  {isUserChat ? (
                    <MenuOption
                      onSelect={() =>
                        Alert.alert(
                          'Delete this message?',
                          `Message will be also be permanently removed from your friend's devices.`,
                          [
                            { text: translate('Cancel'), style: 'cancel' },
                            {
                              text: 'Delete',
                              style: 'destructive',
                              onPress: () => deleteMessage(message._id),
                            },
                          ]
                        )
                      }
                      text={translate('Delete')}
                    />
                  ) : (
                    <MenuOption
                      onSelect={() => reportMessage(message._id)}
                      text={translate('Report')}
                    />
                  )}
                  {message.messageType === 'text' && isUserChat && (
                    <MenuOption
                      onSelect={() => {
                        return openEditMessageModal(
                          message._id,
                          message.text as string
                        );
                      }}
                      text={translate('Edit')}
                    />
                  )}
                </MenuOptions>
              </Menu>
            )}
            <Text
              style={[
                styles.chatTimestamp,
                {
                  alignSelf: isUserChat ? 'flex-end' : 'flex-start',
                },
              ]}
            >
              {message.createdAt != message.editedAt ? 'Edited ·' : ''}{' '}
              {moment(message.createdAt != message.editedAt ? message.editedAt : message.createdAt).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const handlePress = () => {
    Keyboard.dismiss();
    setIsExpanded(!isExpanded);
  };
  const scrollToBottom = () => {
    if (flatListRef && flatListRef.current) {
      (flatListRef.current as Record<string, any>).scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  };
  const handleOnFocus = () => {
    setIsExpanded(false);
  };

  const pickCamera = async () => {
    const permissionCheck = await request(CameraLibraryPermissions[Platform.OS])
    
    if (permissionCheck === RESULTS.LIMITED) {
      Alert.alert(translate('Permission required'), translate('Please enable permissions to Camera.'), [
        {
          text: translate('Cancel'),
          style: 'cancel',
        },
        {text: 'Settings', onPress: () => Linking.openSettings() },
      ]);

      return;
    } else if (permissionCheck !== RESULTS.GRANTED){
      Alert.alert(translate('Permission Required'), translate('Please enable permissions to Camera.'), [
        {
          text: translate('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: translate('Settings'), onPress: () => Linking.openSettings() },
      ]);

      return;
    }
    
    const result: ImagePicker.ImagePickerResponse = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });
    if (
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0] !== null &&
      result.assets[0]
    ) {
      upload({
        channelId,
        fileUri: result.assets[0].uri,
        type: MessageContentType.IMAGE,
      });
    }
  };

  const createImageMessage = async (fileId: string) => {
    if (fileId) {
      const imageMessage = {
        subChannelId: channelId,
        dataType: MessageContentType.IMAGE,
        fileId: fileId,
      };
      await MessageRepository.createMessage(imageMessage);
    }
  };

  const handleOnFinishImage = async (fileId: string, originalPath: string) => {
    createImageMessage(fileId);
    setTimeout(() => {
      setDisplayImages((prevData) => {
        const newData: IDisplayImage[] = prevData.filter(
          (item: IDisplayImage) => item.url !== originalPath
        ); // Filter out objects containing the desired value
        return newData; // Update the state with the filtered array
      });
      setImageMultipleUri((prevData) => {
        const newData = prevData.filter((url: string) => url !== originalPath); // Filter out objects containing the desired value
        return newData; // Update the state with the filtered array
      });
    }, 0);
  };
  
  const pickImage = async () => {

    const permissionCheck = await request(PhotoLibraryPermissions[Platform.OS])
    
    if (permissionCheck === RESULTS.LIMITED) {
      Alert.alert(translate('Permission required'), translate('Please enable full access to Photo Library.'), [
        {
          text: translate('Cancel'),
          style: 'cancel',
        },
        {text: translate('Settings'), onPress: () => Linking.openSettings() },
      ]);

      return;
    } else if (permissionCheck !== RESULTS.GRANTED){
      Alert.alert(translate('Permission required'), translate('Please enable full access to Photo Library.'), [
        {
          text: translate('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: translate('Settings'), onPress: () => Linking.openSettings() },
      ]);

      return;
    }

    const result: ImagePicker.ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 10,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImages: Asset[] = result.assets;

      selectedImages.forEach((image) =>
        upload({
          fileUri: image.uri,
          channelId,
          type: MessageContentType.IMAGE,
        })
      );
    }
  };
  const renderLoadingImages = useMemo(() => {
    return (
      <View style={styles.loadingImage}>
        <FlatList
          keyExtractor={(item, index) => item.fileUri + index}
          data={uploadList.filter((item) => item.channelId === channelId)}
          renderItem={({ item }) => (
            <BaseLoadingImage source={item.fileUri} progress={item.percent} />
          )}
          scrollEnabled={false}
          numColumns={1}
        />
      </View>
    );
  }, [displayImages, handleOnFinishImage]);

  const openEditMessageModal = (messageId: string, text: string) => {
    setEditMessageId(messageId);
    setEditMessageModal(true);
    setEditMessageText(text);
  };

  const closeEditMessageModal = () => {
    setEditMessageId('');
    setEditMessageText('');
    setEditMessageModal(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topBarContainer} edges={['top']}>
        <View style={styles.topBar}>
          <View style={styles.chatTitleWrap}>
            <TouchableOpacity onPress={handleBack}>
              <BackButton onPress={handleBack} />
            </TouchableOpacity>

            {chatReceiver ? (
              chatReceiver?.avatarFileId ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `https://api.${apiRegion}.amity.co/api/v3/files/${chatReceiver?.avatarFileId}/download`,
                  }}
                />
              ) : (
                <View style={styles.avatar}>
                  <AvatarIcon />
                </View>
              )
            ) : groupChatInfo?.avatarFileId ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: `https://api.${apiRegion}.amity.co/api/v3/files/${groupChatInfo?.avatarFileId}/download`,
                }}
              />
            ) : (
              <View style={styles.icon}>
                <GroupChatIcon />
              </View>
            )}
            <View>
              <CustomText style={styles.chatName} numberOfLines={1}>
                {chatReceiver
                  ? chatReceiver?.displayName
                  : groupChatInfo?.displayName}
              </CustomText>
              {groupChatInfo && (
                <CustomText style={styles.chatMember}>
                  {groupChatInfo?.memberCount} {translate('members')}
                </CustomText>
              )}
            </View>
          </View>
          {isResultReady &&
            (!isVipUser ||
              (isVipUser && !(groupChatInfo?.memberCount > 2))) && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChatDetail', {
                    channelId: channelId,
                    channelType: chatReceiver ? 'conversation' : 'community',
                    chatReceiver: chatReceiver ?? undefined,
                    groupChat: groupChatInfo ?? undefined,
                  });
                }}
              >
                <MenuIcon color={theme.colors.base} />
              </TouchableOpacity>
            )}
        </View>
      </SafeAreaView>
      <View style={styles.chatContainer}>
        <FlatList
          data={sortedMessages}
          renderItem={({ item, index }) => renderChatMessages(item, index)}
          keyExtractor={(item) => item._id}
          onEndReached={loadNextMessages}
          onEndReachedThreshold={0.5}
          inverted
          ref={flatListRef}
          ListHeaderComponent={renderLoadingImages}
        />
      </View>

      {canChat && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.AllInputWrap}
        >
          <View style={styles.InputWrap}>
            <TextInput
              style={styles.input}
              value={inputMessage}
              onChangeText={(text) => setInputMessage(text)}
              placeholder="Type a message..."
              placeholderTextColor={theme.colors.baseShade3}
              onFocus={handleOnFocus}
            />

            {inputMessage.trim().length > 0 ? (
              <TouchableOpacity onPress={handleSend} style={styles.sendIcon}>
                <SendChatIcon color={theme.colors.primary} />
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity onPress={handlePress} style={styles.sendIcon}>
                  <PlusIcon color={theme.colors.base} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {isExpanded && (
            <View style={styles.expandedArea}>
              <TouchableOpacity
                onPress={pickCamera}
                style={{ marginHorizontal: 30 }}
              >
                <View style={styles.IconCircle}>
                  <CameraBoldIcon color={theme.colors.base} />
                </View>
                <CustomText style={styles.iconText}>{translate('Camera')}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={loadingImages.length > 0}
                onPress={pickImage}
                style={{ marginHorizontal: 20, alignItems: 'center' }}
              >
                <View style={styles.IconCircle}>
                  <AlbumIcon color={theme.colors.base} />
                </View>
                <CustomText style={styles.iconText}>{translate('Album')}</CustomText>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      )}
      <ImageView
        images={[{ uri: fullImage }]}
        imageIndex={0}
        visible={visibleFullImage}
        onRequestClose={() => setIsVisibleFullImage(false)}
      />
      <EditMessageModal
        visible={editMessageModal}
        onClose={closeEditMessageModal}
        messageText={editMessageText}
        onFinishEdit={closeEditMessageModal}
        messageId={editMessageId}
      />
    </View>
  );
};
export default ChatRoom;
