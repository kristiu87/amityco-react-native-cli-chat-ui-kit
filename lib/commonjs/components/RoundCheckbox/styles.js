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
    roundCheckbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#A5A9B5',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    checked: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0
    },
    checkmark: {
      fontSize: 14,
      fontWeight: '700',
      color: '#fff'
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map