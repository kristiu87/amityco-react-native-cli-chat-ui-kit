import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import useAuth from '../../hooks/useAuth';
import { AvatarIcon } from '../../svg/AvatarIcon';
import translate from '../../translate/translate';
const maxLength = 10;
const displayName = user => {
  if (user.displayName) {
    if (user.displayName.length > maxLength) {
      return user.displayName.substring(0, maxLength) + '..';
    }
    return user.displayName;
  }
  return translate('Display name');
};
const AvatarListItem = ({
  user,
  onDelete
}) => {
  const styles = useStyles();
  const {
    apiRegion
  } = useAuth();
  const avatarFileURL = fileId => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.avatarContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.avatar
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.avatarImageContainer
  }, user.avatarFileId ? /*#__PURE__*/React.createElement(Image, {
    style: styles.avatarImage,
    source: {
      uri: avatarFileURL(user.avatarFileId)
    }
  }) : /*#__PURE__*/React.createElement(AvatarIcon, null)), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onDelete,
    style: styles.deleteButton
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.deleteButtonText
  }, "\u2715"))), /*#__PURE__*/React.createElement(Text, {
    style: styles.userName
  }, displayName(user)));
};
export default function SelectedUserHorizontal({
  users,
  onDeleteUserPressed
}) {
  const styles = useStyles();
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef(null);
  const handleScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };
  const handleMomentumScrollEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollOffset,
        y: 0,
        animated: true
      });
    }
  };
  return /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.container,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    onScroll: handleScroll,
    onMomentumScrollEnd: handleMomentumScrollEnd,
    ref: scrollViewRef,
    style: styles.selectedUser
  }, users.map(user => /*#__PURE__*/React.createElement(AvatarListItem, {
    key: user.userId,
    user: user,
    onDelete: () => onDeleteUserPressed(user)
  })));
}
//# sourceMappingURL=index.js.map