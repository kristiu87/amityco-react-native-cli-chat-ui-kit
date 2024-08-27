import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from './styles';
export const LoadingOverlay = ({
  isLoading,
  loadingText
}) => {
  const styles = useStyles();
  if (!isLoading) {
    return null;
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.overlay
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.indicatorContainer
  }, /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: "large",
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.loadingText
  }, loadingText)));
};
//# sourceMappingURL=index.js.map