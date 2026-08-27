import {
  CHECK_IN_FUNNEL_EVENT_NAMES,
  recordCheckInFunnelEvent,
  submitExistingUserCheckInWithFallback,
} from '@entities/visit';
import { getApiErrorMessage } from '@shared/api';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  buildExistingUserCheckInPayload,
  hasParticipants,
  resolveSelectedPurpose,
} from './checkInFormHelpers';
import { useCheckInLoginPurposeOptions } from './useCheckInLoginPurposeOptions';
import { useCheckInWarningModal } from './useCheckInWarningModal';

type LocationState = {
  readonly userId?: number;
};

const parseLocationState = (value: unknown): LocationState => {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  if ('userId' in value && typeof value.userId === 'number') {
    return { userId: value.userId };
  }

  return {};
};

export const useCheckInLoginFormFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = parseLocationState(location.state);
  const [purposeIndex, setPurposeIndex] = useState<number | null>(null);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const {
    modal,
    openCheckInFailedModal,
    openLoginRequiredFieldsModal,
    openMissingExistingUserModal,
  } = useCheckInWarningModal();
  const {
    purposeOptions,
    isPurposeLoading,
    isPurposeError,
  } = useCheckInLoginPurposeOptions();

  useEffect(() => {
    recordCheckInFunnelEvent({
      eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_FORM_VIEW,
      userId: locationState.userId,
      isExistingUser: true,
    });
  }, [locationState.userId]);

  useEffect(() => {
    if (
      purposeIndex !== null &&
      (purposeIndex < 0 || purposeIndex >= purposeOptions.length)
    ) {
      setPurposeIndex(null);
    }
  }, [purposeIndex, purposeOptions.length]);

  const resetForm = () => {
    setPurposeIndex(null);
    setMaleCount(0);
    setFemaleCount(0);
  };

  const goToComplete = () => {
    resetForm();
    navigate('/check-in/complete');
  };

  const handleSubmit = async () => {
    if (isSaving) return;

    const selectedPurpose = resolveSelectedPurpose(
      purposeOptions,
      purposeIndex
    );

    if (typeof locationState.userId !== 'number') {
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_FAILED,
        failureReason: 'missing_existing_user_id',
      });
      openMissingExistingUserModal(() =>
        navigate('/check-in/user-check', { replace: true })
      );
      return;
    }

    if (!selectedPurpose || !hasParticipants({ maleCount, femaleCount })) {
      openLoginRequiredFieldsModal();
      return;
    }

    const payload = buildExistingUserCheckInPayload({
      userId: locationState.userId,
      maleCount,
      femaleCount,
      selectedPurpose,
      visitTime: DateTime.now()
        .setZone('Asia/Seoul')
        .toISO({ includeOffset: false }),
    });

    try {
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_SUBMITTED,
        userId: locationState.userId,
        isExistingUser: true,
        purpose: selectedPurpose,
      });
      setIsSaving(true);
      await submitExistingUserCheckInWithFallback(payload);
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_SUCCEEDED,
        userId: locationState.userId,
        isExistingUser: true,
        purpose: selectedPurpose,
      });
      goToComplete();
    } catch (error) {
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_FAILED,
        userId: locationState.userId,
        isExistingUser: true,
        purpose: selectedPurpose,
        failureReason: 'existing_user_check_in_failed',
      });
      openCheckInFailedModal(
        getApiErrorMessage(error, '체크인 정보를 서버에 전송하지 못했습니다.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    modal,
    purposeOptions,
    purposeIndex,
    isPurposeLoading,
    isPurposeError,
    maleCount,
    femaleCount,
    isSaving,
    navigateBack: () => navigate(-1),
    selectPurpose: (index: number, label: string) => {
      setPurposeIndex(index);
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.PURPOSE_SELECTED,
        userId: locationState.userId,
        isExistingUser: true,
        purpose: label,
      });
    },
    decreaseMaleCount: () => setMaleCount((count) => Math.max(0, count - 1)),
    increaseMaleCount: () => setMaleCount((count) => count + 1),
    decreaseFemaleCount: () =>
      setFemaleCount((count) => Math.max(0, count - 1)),
    increaseFemaleCount: () => setFemaleCount((count) => count + 1),
    submit: handleSubmit,
  };
};
