import { usePurposeList } from '@entities/purpose';
import type { PurposeResponse } from '@entities/purpose';
import { useEffect, useMemo, useState } from 'react';
import type { LoginPurposeTone } from './CheckInLoginFormSections';
import {
  readPurposeCacheOrEmpty,
  writePurposeCache,
} from './checkInOptionCache';

const purposeTones: readonly LoginPurposeTone[] = ['peach', 'mint', 'blue'];

export const useCheckInLoginPurposeOptions = () => {
  const [cachedPurposes, setCachedPurposes] =
    useState<readonly PurposeResponse[]>(readPurposeCacheOrEmpty);
  const {
    data: purposes = [],
    isLoading: isPurposeLoading,
    isError: isPurposeError,
  } = usePurposeList();

  useEffect(() => {
    if (purposes.length > 0) {
      setCachedPurposes(purposes);
      writePurposeCache(purposes);
    }
  }, [purposes]);

  const visiblePurposes =
    isPurposeLoading || isPurposeError || purposes.length === 0
      ? cachedPurposes
      : purposes;

  const purposeOptions = useMemo(
    () =>
      visiblePurposes.map((purpose, index) => ({
        label: purpose.purpose,
        tone: purposeTones[index % purposeTones.length],
      })),
    [visiblePurposes]
  );

  return {
    purposeOptions,
    isPurposeLoading,
    isPurposeError,
  };
};
