import { useMemo } from 'react';
import { toPurposeOptions } from './purposeOptions';
import { usePurposeList } from './usePurposeList';

export const usePurposeOptions = () => {
  const { data, isLoading, isError, errorUpdatedAt, refetch } = usePurposeList();
  const options = useMemo(() => toPurposeOptions(data ?? []), [data]);

  return { options, isLoading, isError, errorUpdatedAt, refetch };
};
