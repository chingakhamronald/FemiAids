import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { emergencyDataType } from '../screen/Dashboard';


export const useQueryEmergency = () => {
  const { data } = useQuery({
    queryKey: ['emergency'],
    queryFn: async () => {
      const emergencyQuery = firestore().collection('emergency');

      const querySnapshot = await emergencyQuery.get();
      return querySnapshot.docs.map(doc => ({
        id: doc?.id,
        ...doc?.data(),
      })) as emergencyDataType[];
    },
  });
  return [data];
};
