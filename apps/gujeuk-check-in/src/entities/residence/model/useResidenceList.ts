import { useQuery } from '@tanstack/react-query';
import { publicResidenceList } from '../api/residence.api';
import { useIsRemoteSyncReady } from '@shared/lib';

export const usePublicResidenceList = () => {
  const isRemoteSyncReady = useIsRemoteSyncReady();

  return useQuery({
    queryKey: ['publicResidenceList'],
    queryFn: publicResidenceList,
    enabled: isRemoteSyncReady,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
