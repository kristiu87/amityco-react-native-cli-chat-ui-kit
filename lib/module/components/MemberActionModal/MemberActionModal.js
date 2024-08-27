import { Alert, Animated, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useStyles } from './styles';
import { ChannelRepository, createReport } from '@amityco/ts-sdk-react-native';
import useAuth from './../../hooks/useAuth';
import translate from '../../translate/translate';
const MemberActionModal = ({
  isVisible,
  setIsVisible,
  userId,
  channelId,
  hasModeratorPermission,
  isInModeratorTab,
  isChannelModerator,
  onFinish
}) => {
  const styles = useStyles();
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const {
    client
  } = useAuth();
  const currentUserId = client.userId ?? '';
  async function addRole() {
    const didAdd = await ChannelRepository.Moderation.addRole(channelId, 'channel-moderator', [userId]);
    if (didAdd) {
      Alert.alert(translate('Promote to moderator'));
    }
  }
  async function removeRole() {
    const didRemove = await ChannelRepository.Moderation.removeRole(channelId, 'channel-moderator', [userId]);
    if (didRemove) {
      Alert.alert('Remove user from moderator');
    }
  }
  const actionData = useMemo(() => [{
    id: 'demote',
    label: translate('Dismiss to member'),
    shouldShow: hasModeratorPermission && currentUserId !== userId && isInModeratorTab,
    callBack: async () => {
      removeRole();
      onFinish && onFinish();
    }
  }, {
    id: 'promote',
    label: translate('Promote to moderator'),
    shouldShow: hasModeratorPermission && currentUserId !== userId && !isInModeratorTab && !isChannelModerator,
    callBack: async () => {
      addRole();
      onFinish && onFinish();
    }
  }, {
    id: 'report',
    label: translate('Report User'),
    shouldShow: currentUserId !== userId,
    callBack: async () => {
      const isReport = await createReport('user', userId);
      if (isReport) {
        Alert.alert('Report sent ✅');
        onFinish && onFinish();
      }
    }
  }], [channelId, currentUserId, hasModeratorPermission, isInModeratorTab, userId]);
  const closeModal = useCallback(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => setIsVisible(false));
  }, [setIsVisible, slideAnimation]);
  const onPressAction = useCallback(async ({
    callBack
  }) => {
    try {
      await callBack();
    } catch (error) {}
    closeModal();
  }, [closeModal]);
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [isVisible, slideAnimation]);
  const modalStyle = {
    transform: [{
      translateY: slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0]
      })
    }]
  };
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: "fade",
    transparent: true,
    visible: isVisible,
    onRequestClose: closeModal
  }, /*#__PURE__*/React.createElement(Pressable, {
    onPress: closeModal,
    style: styles.modalContainer
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.modalContent, modalStyle]
  }, actionData.map(data => {
    const warningStyle = data.id === 'remove' ? {
      color: 'red'
    } : null;
    if (data.shouldShow) {
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        key: data.id,
        onPress: () => onPressAction(data),
        style: styles.modalRow
      }, /*#__PURE__*/React.createElement(Text, {
        style: [styles.actionText, warningStyle]
      }, data.label));
    } else return null;
  }))));
};
export default /*#__PURE__*/memo(MemberActionModal);
//# sourceMappingURL=MemberActionModal.js.map