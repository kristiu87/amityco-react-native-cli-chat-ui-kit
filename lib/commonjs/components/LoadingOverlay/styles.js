"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
const useStyles = () => {
  const theme = (0, _reactNativePaper.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    overlay: {
      ..._reactNative.StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    indicatorContainer: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center'
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: '600',
      color: '#fff'
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map