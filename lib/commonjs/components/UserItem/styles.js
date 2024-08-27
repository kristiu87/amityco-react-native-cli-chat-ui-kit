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
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 72,
      marginRight: 10
    },
    itemText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.base
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    dotIcon: {
      width: 16,
      height: 12
    },
    threedotsBtn: {
      padding: 5
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map