import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
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
//# sourceMappingURL=styles.js.map