import { useQuery } from '@tanstack/react-query';
import { publicResidenceList, residenceList } from '../index';
import { useResidenceStore } from './residenceStore';
import { useEffect } from 'react';
import { useIsRemoteSyncReady } from '@shared/lib';

export const useResidenceList = () => {
  const setResidences = useResidenceStore((state) => state.setResidences);
  const isRemoteSyncReady = useIsRemoteSyncReady();

  const query = useQuery({
    queryKey: ['residenceList'],
    queryFn: residenceList,
    enabled: isRemoteSyncReady,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setResidences(query.data);
    }
  }, [query.data, setResidences]);

  return query;
};

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
