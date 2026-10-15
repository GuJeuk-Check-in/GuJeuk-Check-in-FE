import { useQuery } from '@tanstack/react-query';
import { purposeList } from '../api/purpose.api';
import { PurposeResponse } from './types';
import { AxiosError } from 'axios';
import { useIsRemoteSyncReady } from '@shared/lib';

export const usePurposeList = () => {
  const isRemoteSyncReady = useIsRemoteSyncReady();

  return useQuery<PurposeResponse[], AxiosError<{ message?: string }>>({
    queryKey: ['purposeList'],
    queryFn: purposeList,
    enabled: isRemoteSyncReady,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
