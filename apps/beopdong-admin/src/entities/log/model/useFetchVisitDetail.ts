import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getVisit } from '../api/log.api';
import { toVisitDetail } from '../lib/visitMapper';

export const useFetchVisitDetail = (logId: string | undefined) => {
  const id = Number(logId);

  return useQuery({
    queryKey: ['visitDetail', id],
    queryFn: async () => toVisitDetail(id, await getVisit(id)),
    enabled: Boolean(logId) && Number.isInteger(id),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => !(isAxiosError(error) && error.response?.status === 404) && failureCount < 3,
  });
};
