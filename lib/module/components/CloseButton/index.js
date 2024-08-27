import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles';
import translate from '../../translate/translate';
export default function CloseButton({
  navigation
}) {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => navigation.goBack()
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.icon
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.cancelText
  }, translate('Cancel'))));
}
//# sourceMappingURL=index.js.map