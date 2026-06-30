import { useQuery } from '@tanstack/react-query';
import { publicResidenceList, residenceList } from '../index';
import { useResidenceStore } from './residenceStore';
import { useEffect } from 'react';

export const useResidenceList = () => {
  const setResidences = useResidenceStore((state) => state.setResidences);

  const query = useQuery({
    queryKey: ['residenceList'],
    queryFn: residenceList,
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
    staleTime: 1000 * 60 * 5,
  });
};
