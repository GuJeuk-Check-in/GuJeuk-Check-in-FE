import { useQuery } from '@tanstack/react-query';
import { purposeList } from '@entities/purpose/api/purpose.api';
import { PurposeResponse } from '@entities/purpose/model/types';
import { AxiosError } from 'axios';

export const usePurposeList = () => {
  return useQuery<PurposeResponse[], AxiosError<{ message?: string }>>({
    queryKey: ['purposeList'],
    queryFn: purposeList,
    staleTime: 1000 * 60 * 5,
  });
};
