import { useQuery } from '@tanstack/react-query';
import { publicResidenceList, residenceList } from '../api/residence.api';
import { useResidenceStore } from './residenceStore';
import { useEffect } from 'react';

export const useResidenceList = () => {
  const setResidences = useResidenceStore((state) => state.setResidences);

  const query = useQuery({
    queryKey: ['residenceList'],
    queryFn: residenceList,
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
  return useQuery({
    queryKey: ['publicResidenceList'],
    queryFn: publicResidenceList,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
