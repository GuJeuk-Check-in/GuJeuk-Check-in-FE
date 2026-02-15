import { useQuery } from '@tanstack/react-query';
import { residenceList } from '@entities/residence/index';
import { ResidenceResponse } from './types';
import { AxiosError } from 'axios';

export const useResidenceList = () => {
  return useQuery<ResidenceResponse[], AxiosError<{ message?: string }>>({
    queryKey: ['residenceList'],
    queryFn: residenceList,
    staleTime: 1000 * 60 * 5,
  });
};
