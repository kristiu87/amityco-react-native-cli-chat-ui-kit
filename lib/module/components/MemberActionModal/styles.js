import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    categoryText: {
      marginLeft: 10,
      marginBottom: 10,
      fontSize: 15
    },
    LoadingIndicator: {
      paddingVertical: 20
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 10,
      backgroundColor: '#D9E5FC'
    },
    dotIcon: {
      width: 16,
      height: 12
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 20,
      minHeight: 120
    },
    modalRow: {
      marginVertical: 10
    },
    actionText: {
      paddingLeft: 8,
      fontWeight: '600',
      color: theme.colors.base,
      fontSize: 14
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map