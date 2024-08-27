import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import RoundCheckbox from '../RoundCheckbox/index';
import useAuth from '../../hooks/useAuth';
import { AvatarIcon } from '../../svg/AvatarIcon';
import { ThreeDotsIcon } from '../../svg/ThreeDotsIcon';
import { useTheme } from 'react-native-paper';
import translate from '../../translate/translate';
export default function UserItem({
  user,
  isCheckmark,
  showThreeDot,
  onPress,
  onThreeDotTap,
  isUserAccount,
  disabled
}) {
  const theme = useTheme();
  const styles = useStyles();
  const {
    apiRegion
  } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const maxLength = 25;
  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onPress) {
      onPress(user);
    }
  };
  const displayName = () => {
    if (user.displayName) {
      if (user.displayName.length > maxLength) {
        return user.displayName.substring(0, maxLength) + '..';
      }
      return user.displayName;
    }
    return translate('Display name');
  };
  const avatarFileURL = fileId => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };
  const Container = ({
    children
  }) => {
    if (disabled) return /*#__PURE__*/React.createElement(View, {
      style: styles.listItem
    }, children);
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.listItem,
      onPress: handleToggle
    }, children);
  };
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(View, {
    style: styles.leftContainer
  }, user !== null && user !== void 0 && user.avatarFileId ? /*#__PURE__*/React.createElement(Image, {
    style: styles.avatar,
    source: {
      uri: avatarFileURL(user.avatarFileId)
    }
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.avatar
  }, /*#__PURE__*/React.createElement(AvatarIcon, null)), /*#__PURE__*/React.createElement(Text, {
    style: styles.itemText
  }, displayName())), !isUserAccount && !showThreeDot ? !disabled && /*#__PURE__*/React.createElement(RoundCheckbox, {
    isChecked: isCheckmark ?? false
  }) : !isUserAccount && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.threedotsBtn,
    onPress: () => {
      if (onThreeDotTap) {
        onThreeDotTap(user);
      }
    }
  }, /*#__PURE__*/React.createElement(ThreeDotsIcon, {
    color: theme.colors.base
  })));
}
//# sourceMappingURL=index.js.map