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
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.baseShade3
    },
    tabText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: theme.colors.baseShade3,
      marginHorizontal: 15,
      textAlign: 'center'
    },
    activeTabText: {
      color: theme.colors.primary
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      backgroundColor: theme.colors.primary
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map