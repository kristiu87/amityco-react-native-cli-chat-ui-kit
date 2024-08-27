import { useEffect } from 'react';
import useIsRole from './useIsRole';
import useGoBackNavigateToStartPage from './useGoBackOrNavigateToStartPage';
export default function useGoBackIfMatchRole(role) {
  const [isCorrectRole, isFetched] = useIsRole(role);
  const goBack = useGoBackNavigateToStartPage();
  useEffect(() => {
    if (isFetched && isCorrectRole) {
      goBack();
    }
  }, [isFetched, isCorrectRole, goBack]);
}
//# sourceMappingURL=useGoBackIfMatchRole.js.map