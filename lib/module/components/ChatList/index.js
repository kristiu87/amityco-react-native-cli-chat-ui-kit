/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { ChannelRepository } from '@amityco/ts-sdk-react-native';
import CustomText from '../CustomText';
import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { CommunityChatIcon } from '../../svg/CommunityChatIcon';
import { PrivateChatIcon } from '../../svg/PrivateChatIcon';
const ChatList = ({
  chatId,
  chatName,
  chatMemberNumber,
  unReadMessage,
  messageDate,
  channelType,
  avatarFileId
}) => {
  const navigation = useNavigation();
  const {
    client,
    apiRegion
  } = useAuth();
  const [oneOnOneChatObject, setOneOnOneChatObject] = useState();
  const [groupChatObject, setGroupChatObject] = useState();
  const [channelAvatarFileId, setChannelAvatarFileId] = useState(avatarFileId);
  const [channelDisplayName, setChannelDisplayName] = useState(chatName);
  const [previewMessage, setPreviewMessage] = useState();
  const styles = useStyles();
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
  useEffect(() => {
    const unsubMembers = ChannelRepository.Membership.getMembers({
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
    const unsubChannel = ChannelRepository.getChannel(chatId, ({
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
  useEffect(() => {
    if (oneOnOneChatObject) {
      var _oneOnOneChatObject$t4, _oneOnOneChatObject$t5;
      const targetIndex = oneOnOneChatObject === null || oneOnOneChatObject === void 0 ? void 0 : oneOnOneChatObject.findIndex(item => item.userId !== client.userId);
      setChannelAvatarFileId(((_oneOnOneChatObject$t4 = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t4 === void 0 || (_oneOnOneChatObject$t4 = _oneOnOneChatObject$t4.user) === null || _oneOnOneChatObject$t4 === void 0 ? void 0 : _oneOnOneChatObject$t4.avatarFileId) ?? avatarFileId);
      setChannelDisplayName((_oneOnOneChatObject$t5 = oneOnOneChatObject[targetIndex]) === null || _oneOnOneChatObject$t5 === void 0 || (_oneOnOneChatObject$t5 = _oneOnOneChatObject$t5.user) === null || _oneOnOneChatObject$t5 === void 0 ? void 0 : _oneOnOneChatObject$t5.displayName);
    }
  }, [oneOnOneChatObject]);
  return /*#__PURE__*/React.createElement(TouchableHighlight, {
    onPress: () => handlePress(chatMemberNumber)
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.chatCard
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.avatarSection
  }, channelAvatarFileId ? /*#__PURE__*/React.createElement(Image, {
    style: styles.icon,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${channelAvatarFileId}/download?size=small`
    }
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.icon
  }, channelType === 'community' ? /*#__PURE__*/React.createElement(CommunityChatIcon, null) : /*#__PURE__*/React.createElement(PrivateChatIcon, null))), /*#__PURE__*/React.createElement(View, {
    style: styles.chatDetailSection
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.chatTitleWrap
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.chatNameWrap
  }, /*#__PURE__*/React.createElement(CustomText, {
    style: styles.chatName,
    numberOfLines: 1
  }, channelDisplayName), /*#__PURE__*/React.createElement(CustomText, {
    style: styles.chatLightText
  }, "(", chatMemberNumber, ")")), /*#__PURE__*/React.createElement(View, {
    style: styles.chatTimeWrap
  }, /*#__PURE__*/React.createElement(CustomText, {
    style: styles.chatLightText
  }, messageDate))), previewMessage && /*#__PURE__*/React.createElement(View, {
    style: styles.chatPreviewWrap
  }, /*#__PURE__*/React.createElement(CustomText, {
    style: styles.chatPreviewMessage,
    numberOfLines: 2
  }, previewMessage), unReadMessage > 0 && /*#__PURE__*/React.createElement(View, {
    style: styles.unReadBadge
  }, /*#__PURE__*/React.createElement(CustomText, {
    style: styles.unReadText
  }, unReadMessage))))));
};
export default ChatList;
//# sourceMappingURL=index.js.map