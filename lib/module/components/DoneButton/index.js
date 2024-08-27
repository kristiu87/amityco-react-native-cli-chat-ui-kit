import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useStyles } from './styles';
import translate from '../../translate/translate';
export default function DoneButton({
  onDonePressed
}) {
  const styles = useStyles();
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onDonePressed
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.icon
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.doneText
  }, translate('Done'))));
}
//# sourceMappingURL=index.js.map