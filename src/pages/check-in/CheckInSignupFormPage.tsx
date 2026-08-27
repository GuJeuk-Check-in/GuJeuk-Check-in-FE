import styled from '@emotion/styled';
import { usePurposeList } from '@entities/purpose';
import type { GenderType } from '@entities/visit';
import {
  CHECK_IN_FUNNEL_EVENT_NAMES,
  getAgeGroupFromBirthYMD,
  recordCheckInFunnelEvent,
  submitHighAvailabilityCheckIn,
  submitNewUserSignUpWithFallback,
} from '@entities/visit';
import { PasswordBackground } from '@shared/ui/Background';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';
import { matchesKoreanSearch } from '@shared/lib';
import { getApiErrorMessage } from '@shared/api';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FiArrowLeft, FiPhone, FiUser } from 'react-icons/fi';
import { usePublicResidenceList } from '@entities/residence';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  BirthDateInputsSection,
  GenderSelectionSection,
  ParticipantCountersSection,
  PrivacyAgreementSection,
  PurposeSelectionSection,
  ResidenceSelectionModal,
  ResidenceSelectorSection,
  SignupSubmitButton,
  TextFieldSection,
} from './CheckInSignupFormSections';
import type { SignupPurposeTone } from './CheckInSignupFormSections';
import {
  readPurposeCacheOrDefaults,
  readResidenceCacheOrDefaults,
  writePurposeCache,
  writeResidenceCache,
} from './checkInOptionCache';
import {
  CHECK_IN_SUBMISSION_MODES,
  parseCheckInSignupRouteState,
} from './checkInRouteState';
import {
  buildNewUserSignUpPayload,
  createBirthYMD,
  hasCompleteSignupRequiredFields,
  resolveSelectedPurpose,
} from './checkInFormHelpers';

const purposeTones: SignupPurposeTone[] = ['peach', 'mint', 'blue'];

const getDigitsOnly = (value: string, maxLength: number) =>
  value.replace(/\D/g, '').slice(0, maxLength);

const CheckInSignupFormPage = () => {
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
    data: residences = [],
    isLoading: isResidenceLoading,
    isError: isResidenceError,
  } = usePublicResidenceList();
  const [cachedResidences, setCachedResidences] = useState(
    readResidenceCacheOrDefaults
  );
  const visibleResidences =
    residences.length > 0 ? residences : cachedResidences;
  const filteredResidences = visibleResidences.filter((r) =>
    matchesKoreanSearch(r.residence, residenceSearch)
  );
  const [cachedPurposes, setCachedPurposes] = useState(
    readPurposeCacheOrDefaults
  );
  const modal = useModal();
  const {
    data: purposes = [],
    isLoading: isPurposeLoading,
    isError: isPurposeError,
  } = usePurposeList();

  useEffect(() => {
    recordCheckInFunnelEvent({
      eventName: CHECK_IN_FUNNEL_EVENT_NAMES.CHECK_IN_FORM_VIEW,
      isExistingUser: false,
    });
  }, []);

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
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '입력 확인',
        subtitle: '필수 항목을 모두 입력하고 개인정보 수집에 동의해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
      return;
    }

    if (!birthYMD) {
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '생년월일 확인',
        subtitle: '생년월일을 올바르게 입력해주세요. 예: 2011년 1월 19일',
        theme: 'warning',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
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
      openErrorModal(
        getApiErrorMessage(error, '체크인 정보를 서버에 전송하지 못했습니다.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Page>
      <PasswordBackground />
      <Panel>
        <Header>
          <TitleRow>
            <BackButton
              type="button"
              onClick={() => navigate(-1)}
              aria-label="뒤로 가기"
            >
              <FiArrowLeft />
            </BackButton>
            <Title>
              <Highlight>구즉</Highlight> 청소년 문화의 <NoWrap>집에</NoWrap>{' '}
              온 걸 환영해~!
            </Title>
          </TitleRow>
          <Subtitle>시설을 이용하려면 작성해줘</Subtitle>
        </Header>

        <FormBody aria-label="시설 이용 정보 입력">
          <PurposeSelectionSection
            options={purposeOptions}
            selectedIndex={purposeIndex}
            isLoading={isPurposeLoading}
            isError={isPurposeError}
            onSelect={(index, label) => {
              setPurposeIndex(index);
              recordCheckInFunnelEvent({
                eventName: CHECK_IN_FUNNEL_EVENT_NAMES.PURPOSE_SELECTED,
                isExistingUser: false,
                purpose: label,
              });
            }}
          />
          <TextFieldSection
            icon={<FiUser aria-hidden="true" />}
            label="이름이 뭐야?"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="친구의 이름을 알려줘"
          />
          <TextFieldSection
            icon={<FiPhone aria-hidden="true" />}
            label="전화번호가 뭐야?"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="010-0000-0000"
          />
          <GenderSelectionSection value={gender} onSelect={setGender} />
          <BirthDateInputsSection
            birthYear={birthYear}
            birthMonth={birthMonth}
            birthDay={birthDay}
            onBirthYearChange={(event) =>
              setBirthYear(getDigitsOnly(event.target.value, 4))
            }
            onBirthMonthChange={(event) =>
              setBirthMonth(getDigitsOnly(event.target.value, 2))
            }
            onBirthDayChange={(event) =>
              setBirthDay(getDigitsOnly(event.target.value, 2))
            }
          />
          <ResidenceSelectorSection
            residence={residence}
            onOpen={() => {
              setResidenceSearch('');
              setResidenceModalOpen(true);
            }}
          />
          <ParticipantCountersSection
            maleCount={maleCount}
            femaleCount={femaleCount}
            onDecreaseMale={() =>
              setMaleCount((count) => Math.max(0, count - 1))
            }
            onIncreaseMale={() => setMaleCount((count) => count + 1)}
            onDecreaseFemale={() =>
              setFemaleCount((count) => Math.max(0, count - 1))
            }
            onIncreaseFemale={() => setFemaleCount((count) => count + 1)}
          />
          <PrivacyAgreementSection
            checked={privacyAgreed}
            onChange={(event) => setPrivacyAgreed(event.target.checked)}
          />
          <SignupSubmitButton isSaving={isSaving} onClick={handleSubmit} />
        </FormBody>
      </Panel>
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
      {residenceModalOpen &&
        createPortal(
          <ResidenceSelectionModal
            residences={filteredResidences}
            selectedResidence={residence}
            search={residenceSearch}
            isLoading={isResidenceLoading}
            isError={isResidenceError}
            onSearchChange={(event) => setResidenceSearch(event.target.value)}
            onSelect={(selectedResidence) => {
              setResidence(selectedResidence);
              setResidenceModalOpen(false);
            }}
            onClose={() => setResidenceModalOpen(false)}
          />,
          document.body
        )}
      <Footer>made by Busurker</Footer>
    </Page>
  );
};

export default CheckInSignupFormPage;

const Page = styled.main`
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 6.5rem 1.5rem 4rem;
`;

const Panel = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 64rem);
  margin: 0 auto;
  box-sizing: border-box;
  padding: clamp(2rem, 4vw, 4rem);
  border: 0.125rem solid #e7eaf3;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 1.5rem 2.75rem rgba(24, 48, 88, 0.15);
`;

const Header = styled.header`
  text-align: center;
`;

const TitleRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;

  @media (max-width: 560px) {
    align-items: flex-start;
    padding-top: 3rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 400;
  line-height: 1.2;
`;

const Highlight = styled.span`
  color: #f3b000;
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

const Subtitle = styled.p`
  margin: 0.75rem 0 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #2f66ad;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background: #f0f4fb;
  }

  @media (max-width: 560px) {
    top: 0;
    transform: none;
  }
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: 4rem;
  color: #1f63b7;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
`;
