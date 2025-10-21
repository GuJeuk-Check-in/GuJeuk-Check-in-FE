import { useQuery } from '@tanstack/react-query';
import { purposeList } from '../api/purposeApi';

export const usePurposeList = () => {
  return useQuery({
    queryKey: ['purposes'],
    queryFn: purposeList,
    staleTime: 1000 * 60 * 60,
  });
};
