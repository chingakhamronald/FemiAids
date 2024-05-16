import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { categoryType } from '../types';



export const useQueryCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const categoryQuery = firestore().collection('category');

      const querySnapshot = await categoryQuery.get();
      return querySnapshot.docs.map(doc => ({
        id: doc?.id,
        ...doc?.data(),
      })) as categoryType[];
    },
  });
  return { data, isLoading };
};
