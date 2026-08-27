import { usePurposeList } from '@entities/purpose';
import type { PurposeResponse } from '@entities/purpose';
import {
  CHECK_IN_FUNNEL_EVENT_NAMES,
  recordCheckInFunnelEvent,
  submitExistingUserCheckInWithFallback,
} from '@entities/visit';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';
import { getApiErrorMessage } from '@shared/api';
import { useEffect, useMemo, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  CheckInLoginPageLayout,
  LoginSubmitButton,
  ParticipantCountersSection,
  PurposeSelectionSection,
} from './CheckInLoginFormSections';
import type { LoginPurposeTone } from './CheckInLoginFormSections';
import {
  readPurposeCacheOrEmpty,
  writePurposeCache,
} from './checkInOptionCache';
import {
  buildExistingUserCheckInPayload,
  hasParticipants,
  resolveSelectedPurpose,
} from './checkInFormHelpers';

const purposeTones: LoginPurposeTone[] = ['peach', 'mint', 'blue'];

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

const CheckInLoginFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = parseLocationState(location.state);
  const [purposeIndex, setPurposeIndex] = useState<number | null>(null);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [cachedPurposes, setCachedPurposes] =
    useState<readonly PurposeResponse[]>(readPurposeCacheOrEmpty);
  const modal = useModal();
  const {
    data: purposes = [],
    isLoading: isPurposeLoading,
    isError: isPurposeError,
  } = usePurposeList();

  useEffect(() => {
    recordCheckInFunnelEvent({
      eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_FORM_VIEW,
      userId: locationState.userId,
      isExistingUser: true,
    });
  }, [locationState.userId]);

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

  const openErrorModal = (message: string) => {
    modal.openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: '체크인 실패',
      subtitle: message,
      theme: 'warning',
      buttons: [
        {
          label: '확인',
          variant: 'secondary',
          onClick: modal.closeModal,
        },
      ],
    });
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
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '회원 확인 필요',
        subtitle: '처음 화면에서 이름과 전화번호를 다시 확인해주세요.',
        theme: 'warning',
        buttons: [
          {
            label: '확인',
            onClick: () => navigate('/check-in/user-check', { replace: true }),
          },
        ],
      });
      return;
    }

    if (!selectedPurpose || !hasParticipants({ maleCount, femaleCount })) {
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '입력 확인',
        subtitle: '방문 목적과 인원을 입력해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
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
      openErrorModal(
        getApiErrorMessage(error, '체크인 정보를 서버에 전송하지 못했습니다.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <CheckInLoginPageLayout onBack={() => navigate(-1)}>
        <PurposeSelectionSection
          options={purposeOptions}
          selectedIndex={purposeIndex}
          isLoading={isPurposeLoading}
          isError={isPurposeError}
          onSelect={(index, label) => {
            setPurposeIndex(index);
            recordCheckInFunnelEvent({
              eventName: CHECK_IN_FUNNEL_EVENT_NAMES.PURPOSE_SELECTED,
              userId: locationState.userId,
              isExistingUser: true,
              purpose: label,
            });
          }}
        />
        <ParticipantCountersSection
          maleCount={maleCount}
          femaleCount={femaleCount}
          onDecreaseMale={() => setMaleCount((count) => Math.max(0, count - 1))}
          onIncreaseMale={() => setMaleCount((count) => count + 1)}
          onDecreaseFemale={() =>
            setFemaleCount((count) => Math.max(0, count - 1))
          }
          onIncreaseFemale={() => setFemaleCount((count) => count + 1)}
        />
        <LoginSubmitButton isSaving={isSaving} onClick={handleSubmit} />
      </CheckInLoginPageLayout>
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

export default CheckInLoginFormPage;
