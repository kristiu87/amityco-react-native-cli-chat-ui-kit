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
    sectionHeader: {
      backgroundColor: theme.colors.secondary,
      paddingVertical: 10,
      paddingHorizontal: 10
    },
    sectionHeaderText: {
      fontWeight: '600',
      fontSize: 15,
      color: theme.colors.baseShade2
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map