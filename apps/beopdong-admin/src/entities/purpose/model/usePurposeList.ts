import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getPurposeList } from '../api/purpose.api';
import type { Purpose } from '../ui/PurposeCard';
import type { PurposeListResponse } from './types';

const toPurposes = ({ purposes }: PurposeListResponse): readonly Purpose[] =>
  purposes.map(({ id, purposeName }) => ({ id, purpose: purposeName, isLocked: false }));

export const usePurposeList = (refetchInterval?: number) => {
  return useQuery<PurposeListResponse, AxiosError<{ message?: string }>, readonly Purpose[]>({
    queryKey: ['purposeList'],
    queryFn: getPurposeList,
    select: toPurposes,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval,
  });
};
