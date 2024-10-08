import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      paddingLeft: 10,
      paddingTop: 12,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      height: 100
    },
    avatarContainer: {
      marginRight: 10,
      alignItems: 'center'
    },
    avatar: {
      position: 'relative',
      width: 40,
      height: 40
    },
    avatarImageContainer: {
      overflow: 'hidden',
      borderRadius: 40,
      width: 40,
      height: 40
    },
    avatarImage: {
      width: 40,
      height: 40
    },
    deleteButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 10,
      width: 20,
      height: 20,
      position: 'absolute',
      top: 0,
      right: -8,
      alignItems: 'center',
      justifyContent: 'center'
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 'bold'
    },
    userName: {
      marginTop: 5,
      fontSize: 13,
      color: theme.colors.base
    },
    selectedUser: {
      // height: 150
      paddingBottom: 30
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map