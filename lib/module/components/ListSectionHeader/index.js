import React from "react";
import { Text, View } from 'react-native';
import { useStyles } from './styles';
export default function SectionHeader({
  title
}) {
  const styles = useStyles();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.sectionHeader
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionHeaderText
  }, title));
}
;
//# sourceMappingURL=index.js.map