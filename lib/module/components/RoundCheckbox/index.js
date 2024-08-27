import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './styles';
export default function RoundCheckbox({
  isChecked
}) {
  const styles = useStyles();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.roundCheckbox, isChecked && styles.checked]
  }, isChecked && /*#__PURE__*/React.createElement(Text, {
    style: styles.checkmark
  }, "\u2713"));
}
//# sourceMappingURL=index.js.map