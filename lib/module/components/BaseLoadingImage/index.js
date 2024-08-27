import React, { useMemo } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import { createStyles } from './styles';
import translate from '../../translate/translate';
const BaseLoadingImage = ({
  source,
  isShowSending = true,
  containerStyle,
  progress
}) => {
  const isProcess = useMemo(() => progress === 100, [progress]);
  const loading = useMemo(() => !isProcess, [isProcess]);
  const styles = createStyles();
  return /*#__PURE__*/React.createElement(View, {
    key: source,
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.imageContainer
  }, /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: source
    },
    style: [containerStyle ? containerStyle : styles.image, loading ? styles.loadingImage : styles.loadedImage]
  }), loading && /*#__PURE__*/React.createElement(View, {
    style: styles.overlay
  }, isProcess ? /*#__PURE__*/React.createElement(Progress.CircleSnail, {
    size: 60,
    borderColor: "transparent"
  }) : /*#__PURE__*/React.createElement(Progress.Circle, {
    progress: 50 / 100,
    size: 60,
    borderColor: "transparent",
    unfilledColor: "#ffffff"
  }))), isShowSending && loading && /*#__PURE__*/React.createElement(View, {
    style: styles.loadingRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.loadingText
  }, translate('sending')), /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: 20,
    color: 'gray'
  })));
};
export default BaseLoadingImage;
//# sourceMappingURL=index.js.map