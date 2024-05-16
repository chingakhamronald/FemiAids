import firestore from '@react-native-firebase/firestore';
import { useQuery } from 'react-query';
import { ISchemeData } from './useStore';

export const useQueryScheme = (category: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['scheme', category],
    queryFn: async () => {
      let schemeQuery;

      if (category === 'All Data') {
        schemeQuery = firestore().collection('scheme');
      } else {
        schemeQuery = firestore()
          .collection('scheme')
          .where('category', '==', category);
      }

      const querySnapshot = await schemeQuery.get();
      return querySnapshot.docs.map(doc => ({
        id: doc?.id,
        ...doc?.data(),
      })) as ISchemeData[];
    },
  });
  return { data, isLoading };
};
