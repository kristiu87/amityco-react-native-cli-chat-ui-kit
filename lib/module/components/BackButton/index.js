import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackIcon } from '../../svg/BackIcon';
import { useTheme } from 'react-native-paper';
export default function BackButton({
  onPress
}) {
  const theme = useTheme();
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      navigation.goBack();
      onPress && onPress();
    }
  }, /*#__PURE__*/React.createElement(BackIcon, {
    color: theme.colors.base
  }));
}
//# sourceMappingURL=index.js.map