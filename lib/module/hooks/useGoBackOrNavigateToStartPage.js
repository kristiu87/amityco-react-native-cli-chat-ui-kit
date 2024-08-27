import { StackActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
export default function useGoBackNavigateToStartPage() {
  const navigation = useNavigation();
  return useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(StackActions.replace('RecentChat'));
    }
  }, [navigation]);
}
//# sourceMappingURL=useGoBackOrNavigateToStartPage.js.map