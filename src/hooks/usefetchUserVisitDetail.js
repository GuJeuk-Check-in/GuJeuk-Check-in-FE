import { useQuery } from '@tanstack/react-query';
import { fetchUserVisitDetail } from '../api/visitApi';

export const usefetchUserVisitDetail = (id) => {
  const enabled = !!id && id !== 'new';

  return useQuery({
    queryKey: ['visitDetail', id],
    queryFn: () => fetchUserVisitDetail(id),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
};
