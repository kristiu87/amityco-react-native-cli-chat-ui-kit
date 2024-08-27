import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
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
//# sourceMappingURL=styles.js.map