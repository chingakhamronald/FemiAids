import firestore from '@react-native-firebase/firestore';
import { useQuery } from 'react-query';
import { ISchemeData } from './useStore';

export const useQueryScheme = (category: string) => {
  console.log({ category: category });


  const { data } = useQuery({
    queryKey: ['scheme', category],
    queryFn: async () => {
      let schemeQuery = firestore().collection('scheme');

      const querySnapshot = await schemeQuery.get();
      return querySnapshot.docs.map(doc => ({
        id: doc?.id,
        ...doc?.data(),
      })) as ISchemeData[];
    },
  });
  return [data];
};
