import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { docType } from '../types';

export const useQueryDoctor = (medicalName: string) => {
  const { data } = useQuery({
    queryKey: ['doctor', medicalName],
    queryFn: async () => {
      const doctorQuery = firestore()
        .collection('doctor')
        .where('tag', '==', medicalName);

      const querySnapshot = await doctorQuery.get();
      return querySnapshot.docs.map(doc => ({
        id: doc?.id,
        ...doc?.data(),
      })) as docType[];
    },
  });
  return [data];
};
