import { useMutation, useQueryClient } from 'react-query';
import firestore from '@react-native-firebase/firestore';

export const useMutationEmergency = (emergencyId: any) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (emergencyData: any) => {
      const emergencyRef = firestore().collection('emergency').doc(emergencyId);
      await emergencyRef.update(emergencyData);
    },
    {
      onSuccess: async (data, variables) => {

        if (variables) {
          queryClient.invalidateQueries({ queryKey: ['emergency'] })
        }
      },
    },
  );

  return { mutate, isLoading };
};
