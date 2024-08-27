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
    icon: {
      backgroundColor: theme.colors.background,
      color: '#000',
      height: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    doneText: {
      fontSize: 18,
      color: theme.colors.primary
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map