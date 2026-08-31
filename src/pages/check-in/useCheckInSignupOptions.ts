import { usePurposeList } from '@entities/purpose';
import { usePublicResidenceList } from '@entities/residence';
import { matchesKoreanSearch } from '@shared/lib';
import { useEffect, useMemo, useState } from 'react';
import type { SignupPurposeTone } from './CheckInSignupFormSections';
import {
  readPurposeCacheOrDefaults,
  readResidenceCacheOrDefaults,
  writePurposeCache,
  writeResidenceCache,
} from './checkInOptionCache';

const purposeTones: readonly SignupPurposeTone[] = ['peach', 'mint', 'blue'];

export const useCheckInSignupOptions = (residenceSearch: string) => {
  const {
    data: residences = [],
    isLoading: isResidenceLoading,
    isError: isResidenceError,
  } = usePublicResidenceList();
  const [cachedResidences, setCachedResidences] = useState(
    readResidenceCacheOrDefaults
  );
  const [cachedPurposes, setCachedPurposes] = useState(
    readPurposeCacheOrDefaults
  );
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

  useEffect(() => {
    if (residences.length > 0) {
      setCachedResidences(residences);
      writeResidenceCache(residences);
    }
  }, [residences]);

  const visibleResidences =
    residences.length > 0 ? residences : cachedResidences;
  const filteredResidences = visibleResidences.filter((residenceOption) =>
    matchesKoreanSearch(residenceOption.residence, residenceSearch)
  );
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
    filteredResidences,
    isPurposeLoading,
    isPurposeError,
    isResidenceLoading,
    isResidenceError,
  };
};
