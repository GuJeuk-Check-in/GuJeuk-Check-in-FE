import { useQuery } from '@tanstack/react-query';
import { purposeList } from '../purposeApi';

export const usePurposeList = () => {
  return useQuery({
    queryKey: ['purposeList'],
    queryFn: purposeList,
    staleTime: 1000 * 60 * 5,
  });
};
