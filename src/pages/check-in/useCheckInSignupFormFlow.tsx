import type { GenderType } from '@entities/visit';
import {
  CHECK_IN_FUNNEL_EVENT_NAMES,
  getAgeGroupFromBirthYMD,
  recordCheckInFunnelEvent,
  submitHighAvailabilityCheckIn,
  submitNewUserSignUpWithFallback,
} from '@entities/visit';
import { getApiErrorMessage } from '@shared/api';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  buildNewUserSignUpPayload,
  createBirthYMD,
  hasCompleteSignupRequiredFields,
  resolveSelectedPurpose,
} from './checkInFormHelpers';
import { useCheckInSignupOptions } from './useCheckInSignupOptions';
import { useCheckInWarningModal } from './useCheckInWarningModal';
import {
  CHECK_IN_SUBMISSION_MODES,
  parseCheckInSignupRouteState,
} from './checkInRouteState';

const getDigitsOnly = (value: string, maxLength: number) =>
  value.replace(/\D/g, '').slice(0, maxLength);

export const useCheckInSignupFormFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = parseCheckInSignupRouteState(location.state);
  const [name, setName] = useState(locationState.name);
  const [phone, setPhone] = useState(locationState.phone);
  const [gender, setGender] = useState<GenderType | ''>('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [purposeIndex, setPurposeIndex] = useState<number | null>(null);
  const [residence, setResidence] = useState('');
  const [residenceModalOpen, setResidenceModalOpen] = useState(false);
  const [residenceSearch, setResidenceSearch] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    modal,
    openCheckInFailedModal,
    openSignupBirthDateModal,
    openSignupRequiredFieldsModal,
  } = useCheckInWarningModal();
  const {
    purposeOptions,
    filteredResidences,
    isPurposeLoading,
    isPurposeError,
    isResidenceLoading,
    isResidenceError,
  } = useCheckInSignupOptions(residenceSearch);

  useEffect(() => {
    recordCheckInFunnelEvent({
      eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_FORM_VIEW,
      isExistingUser: false,
    });
  }, []);

  useEffect(() => {
    if (
      purposeIndex !== null &&
      (purposeIndex < 0 || purposeIndex >= purposeOptions.length)
    ) {
      setPurposeIndex(null);
    }
  }, [purposeIndex, purposeOptions.length]);

  useEffect(() => {
    if (!residenceModalOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResidenceModalOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [residenceModalOpen]);

  const resetForm = () => {
    setName('');
    setPhone('');
    setGender('');
    setBirthYear('');
    setBirthMonth('');
    setBirthDay('');
    setResidence('');
    setPurposeIndex(null);
    setMaleCount(0);
    setFemaleCount(0);
    setPrivacyAgreed(false);
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
    const birthYMD = createBirthYMD(birthYear, birthMonth, birthDay);
    const requiredFields = {
      name,
      phone,
      gender,
      birthYear,
      birthMonth,
      birthDay,
      residence,
      selectedPurpose,
      privacyAgreed,
      maleCount,
      femaleCount,
    };

    if (!hasCompleteSignupRequiredFields(requiredFields)) {
      openSignupRequiredFieldsModal();
      return;
    }

    if (!birthYMD) {
      openSignupBirthDateModal();
      return;
    }

    const payload = buildNewUserSignUpPayload({
      name,
      gender: requiredFields.gender,
      phone,
      maleCount,
      femaleCount,
      birthYMD,
      residence,
      selectedPurpose,
      visitTime: DateTime.now()
        .setZone('Asia/Seoul')
        .toISO({ includeOffset: false }),
      privacyAgreed,
    });
    const ageGroup = getAgeGroupFromBirthYMD(birthYMD, payload.visitTime);

    try {
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_SUBMITTED,
        ageGroup,
        isExistingUser: false,
        visitCountBucket: 'FIRST_VISIT',
        purpose: selectedPurpose,
      });
      setIsSaving(true);
      if (
        locationState.submissionMode ===
        CHECK_IN_SUBMISSION_MODES.HIGH_AVAILABILITY
      ) {
        await submitHighAvailabilityCheckIn(payload);
      } else {
        await submitNewUserSignUpWithFallback(payload);
      }
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_SUCCEEDED,
        ageGroup,
        isExistingUser: false,
        visitCountBucket: 'FIRST_VISIT',
        purpose: selectedPurpose,
      });
      goToComplete();
    } catch (error) {
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_API_FAILED,
        ageGroup,
        isExistingUser: false,
        visitCountBucket: 'FIRST_VISIT',
        purpose: selectedPurpose,
        failureReason: 'new_user_check_in_failed',
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
    name,
    phone,
    gender,
    birthYear,
    birthMonth,
    birthDay,
    purposeIndex,
    purposeOptions,
    residence,
    residenceModalOpen,
    residenceSearch,
    filteredResidences,
    isResidenceLoading,
    isResidenceError,
    maleCount,
    femaleCount,
    privacyAgreed,
    isSaving,
    isPurposeLoading,
    isPurposeError,
    navigateBack: () => navigate(-1),
    setNameFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setName(event.target.value),
    setPhoneFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setPhone(event.target.value),
    setGender,
    setBirthYearFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setBirthYear(getDigitsOnly(event.target.value, 4)),
    setBirthMonthFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setBirthMonth(getDigitsOnly(event.target.value, 2)),
    setBirthDayFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setBirthDay(getDigitsOnly(event.target.value, 2)),
    openResidenceModal: () => {
      setResidenceSearch('');
      setResidenceModalOpen(true);
    },
    setResidenceSearchFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setResidenceSearch(event.target.value),
    selectResidence: (selectedResidence: string) => {
      setResidence(selectedResidence);
      setResidenceModalOpen(false);
    },
    closeResidenceModal: () => setResidenceModalOpen(false),
    selectPurpose: (index: number, label: string) => {
      setPurposeIndex(index);
      recordCheckInFunnelEvent({
        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.PURPOSE_SELECTED,
        isExistingUser: false,
        purpose: label,
      });
    },
    decreaseMaleCount: () => setMaleCount((count) => Math.max(0, count - 1)),
    increaseMaleCount: () => setMaleCount((count) => count + 1),
    decreaseFemaleCount: () =>
      setFemaleCount((count) => Math.max(0, count - 1)),
    increaseFemaleCount: () => setFemaleCount((count) => count + 1),
    setPrivacyAgreedFromInput: (event: ChangeEvent<HTMLInputElement>) =>
      setPrivacyAgreed(event.target.checked),
    submit: handleSubmit,
  };
};
