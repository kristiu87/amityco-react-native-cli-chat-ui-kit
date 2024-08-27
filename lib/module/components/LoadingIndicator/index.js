import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
export default function LoadingIndicator({
  propStyle,
  size = 20,
  color = 'gray'
}) {
  let style = styles.container;
  if (propStyle !== undefined) {
    style = [styles.container, propStyle];
  }
  return /*#__PURE__*/React.createElement(View, {
    style: style
  }, /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: size,
    color: color
  }));
}
//# sourceMappingURL=index.js.map