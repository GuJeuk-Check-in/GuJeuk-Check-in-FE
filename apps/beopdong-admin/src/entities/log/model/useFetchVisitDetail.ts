import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { usePurposeOptions } from '@entities/purpose';
import { getVisit } from '../api/log.api';
import { toVisitDetail } from '../lib/visitMapper';
import type { VisitDetailResponse } from './dto';

export const useFetchVisitDetail = (logId: string | undefined) => {
  const id = Number(logId);
  const { options, isLoading: isPurposeLoading } = usePurposeOptions();
  const select = useCallback((dto: VisitDetailResponse) => toVisitDetail(id, dto, options), [id, options]);

  const query = useQuery({
    queryKey: ['visitDetail', id],
    queryFn: () => getVisit(id),
    select,
    enabled: Boolean(logId) && Number.isInteger(id) && !isPurposeLoading,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => !(isAxiosError(error) && error.response?.status === 404) && failureCount < 3,
  });

  return { ...query, isLoading: query.isLoading || isPurposeLoading };
};
