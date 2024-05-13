import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { IMedicalData } from '../components/MedicalList';


export const useQueryMedical = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['medical'],
    queryFn: async () => {
      const emergencyQuery = firestore().collection('medical');

      const querySnapshot = await emergencyQuery.get();
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IMedicalData[];
    },
  });
  return { data, isLoading, refetch };
};
