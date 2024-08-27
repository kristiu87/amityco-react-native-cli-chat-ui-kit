import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { leaveAmityChannel } from '../../providers/channel-provider';
import { useStyles } from './styles';
import { createReport } from '@amityco/ts-sdk-react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import EditIcon from '../../svg/EditIcon';
import { ArrowRightIcon } from '../../svg/ArrowRightIcon';
import { GroupMembersIcon } from '../../svg/GroupMembersIcon';
import { BackIcon } from '../../svg/BackIcon';
import { useTheme } from 'react-native-paper';
import useIsRole from '../../hooks/useIsRole';
import translate from '../../translate/translate';
export const ChatRoomSetting = ({
  navigation,
  route
}) => {
  const [isVipUser, isResultReady] = useIsRole('vipUser');
  const theme = useTheme();
  const styles = useStyles();
  const {
    channelId,
    channelType,
    chatReceiver,
    groupChat
  } = route.params;
  const [showReportAlert, setShowReportAlert] = useState(false);
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
    Alert.alert(translate('Leave Chat'), translate('If leave this group, you’ll no longer be able to see any messages and files.'), [{
      text: translate('Cancel'),
      style: 'cancel'
    }, {
      text: translate('Leave'),
      style: 'destructive',
      onPress: () => onLeaveChat()
    }]);
  };
  async function flagUser() {
    if (chatReceiver) {
      const didCreateUserReport = await createReport('user', chatReceiver.userId);
      if (didCreateUserReport) {
        Alert.alert(translate('Report sent'), '', [{
          text: translate('Ok')
        }]);
      }
    }
  }
  const onLeaveChat = async () => {
    try {
      const isLeave = await leaveAmityChannel(channelId);
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
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          style: styles.rowContainer,
          onPress: handleGroupProfilePress
        }, /*#__PURE__*/React.createElement(View, {
          style: styles.iconContainer
        }, /*#__PURE__*/React.createElement(EditIcon, null)), /*#__PURE__*/React.createElement(Text, {
          style: styles.rowText
        }, translate('Group profile')), /*#__PURE__*/React.createElement(ArrowRightIcon, null));
      case 2:
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          style: styles.rowContainer,
          onPress: handleMembersPress
        }, /*#__PURE__*/React.createElement(View, {
          style: styles.iconContainer
        }, /*#__PURE__*/React.createElement(GroupMembersIcon, null)), /*#__PURE__*/React.createElement(Text, {
          style: styles.rowText
        }, translate('Members')), /*#__PURE__*/React.createElement(ArrowRightIcon, {
          color: theme.colors.base
        }));
      case 3:
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          style: styles.rowContainer,
          onPress: handleLeaveChatPress
        }, /*#__PURE__*/React.createElement(View, {
          style: styles.ChatSettingContainer
        }, /*#__PURE__*/React.createElement(Text, {
          style: styles.leaveChatLabel
        }, translate('Leave Chat'))));
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleGoBack,
    style: styles.closeButton
  }, /*#__PURE__*/React.createElement(BackIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, translate('Chat Detail')))), channelType === 'conversation' ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.rowContainer,
    onPress: flagUser
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.ChatSettingContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.reportChatLabel
  }, translate('Report User')))) : !isVipUser && isResultReady && /*#__PURE__*/React.createElement(FlatList, {
    data: data,
    renderItem: renderItem,
    keyExtractor: item => item.id.toString()
  }), /*#__PURE__*/React.createElement(AwesomeAlert, {
    show: showReportAlert,
    showProgress: false,
    title: "Report sent",
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: false,
    showCancelButton: false,
    showConfirmButton: true,
    confirmText: translate('Ok'),
    confirmButtonColor: "#1054DE",
    onCancelPressed: () => {
      setShowReportAlert(false);
    },
    onConfirmPressed: () => setShowReportAlert(false),
    onDismiss: () => setShowReportAlert(false)
  }));
};
//# sourceMappingURL=ChatRoomSetting.js.map