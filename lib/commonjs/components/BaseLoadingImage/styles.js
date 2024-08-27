"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStyles = void 0;
var _reactNative = require("react-native");
const createStyles = () => {
  return _reactNative.StyleSheet.create({
    container: {
      marginVertical: 15
    },
    imageContainer: {
      position: 'relative',
      margin: 3
    },
    image: {
      resizeMode: 'cover',
      maxWidth: 350,
      maxHeight: 220,
      width: _reactNative.Dimensions.get('window').width / 2,
      height: _reactNative.Dimensions.get('window').width / 3.25,
      borderRadius: 10
    },
    overlay: {
      ..._reactNative.StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 6
    },
    progressBar: {
      marginVertical: 10
    },
    loadingImage: {
      opacity: 0.5
    },
    loadedImage: {
      opacity: 1
    },
    closeButton: {
      position: 'absolute',
      top: 7,
      right: 7,
      padding: 7,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 72
    },
    loadingRow: {
      flexDirection: 'row',
      paddingTop: 4
    },
    loadingText: {
      marginRight: 10
    }
  });
};
exports.createStyles = createStyles;
//# sourceMappingURL=styles.js.map