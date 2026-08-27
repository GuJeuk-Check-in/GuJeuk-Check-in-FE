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
import {
  FaBirthdayCake,
  FaExclamationTriangle,
  FaMars,
  FaRegCheckSquare,
  FaVenus,
} from 'react-icons/fa';
import {
  FiArrowLeft,
  FiHome,
  FiMinus,
  FiPhone,
  FiPlus,
  FiSearch,
  FiUser,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { usePublicResidenceList } from '@entities/residence';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
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

const genderOptions = [
  { label: '남자', value: 'MAN', tone: 'mint', icon: <FaMars /> },
  { label: '여자', value: 'WOMAN', tone: 'pink', icon: <FaVenus /> },
] as const;

type Tone = 'peach' | 'mint' | 'blue' | 'pink';
const purposeTones: Tone[] = ['peach', 'mint', 'blue'];

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
              <Highlight>구즉</Highlight> 청소년 문화의 집에 온 걸 환영해~!
            </Title>
          </TitleRow>
          <Subtitle>시설을 이용하려면 작성해줘</Subtitle>
        </Header>

        <FormBody aria-label="시설 이용 정보 입력">
          <FieldBlock>
            <FieldLabel>
              <IoRocketOutline aria-hidden="true" />
              오늘은 무엇을 하러 왔어?
            </FieldLabel>
            {purposeOptions.length > 0 ? (
              <OptionGrid $columns={5}>
                {purposeOptions.map((option, index) => (
                  <PurposeCard
                    key={`${option.label}-${index}`}
                    type="button"
                    $tone={option.tone}
                    $selected={purposeIndex === index}
                    onClick={() => {
                      setPurposeIndex(index);
                      recordCheckInFunnelEvent({
                        eventName: CHECK_IN_FUNNEL_EVENT_NAMES.PURPOSE_SELECTED,
                        isExistingUser: false,
                        purpose: option.label,
                      });
                    }}
                  >
                    {option.label}
                  </PurposeCard>
                ))}
              </OptionGrid>
            ) : (
              <PurposeNotice>
                {isPurposeLoading
                  ? '방문 목적을 불러오는 중입니다.'
                  : isPurposeError
                  ? '방문 목적을 불러오지 못했습니다.'
                  : '등록된 방문 목적이 없습니다.'}
              </PurposeNotice>
            )}
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <FiUser aria-hidden="true" />
              이름이 뭐야?
            </FieldLabel>
            <TextInput
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="친구의 이름을 알려줘"
            />
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <FiPhone aria-hidden="true" />
              전화번호가 뭐야?
            </FieldLabel>
            <TextInput
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="010-0000-0000"
            />
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <FaRegCheckSquare aria-hidden="true" />
              성별을 알려줘
            </FieldLabel>
            <OptionGrid $columns={2}>
              {genderOptions.map((option) => (
                <OptionCard
                  key={option.label}
                  type="button"
                  $tone={option.tone}
                  $selected={gender === option.value}
                  onClick={() => setGender(option.value)}
                >
                  <OptionIcon $tone={option.tone}>{option.icon}</OptionIcon>
                  <span>{option.label}</span>
                </OptionCard>
              ))}
            </OptionGrid>
          </FieldBlock>

          <FieldBlock>
            <FieldLabel id="birth-date-label">
              <FaBirthdayCake aria-hidden="true" />
              언제 태어났어?
            </FieldLabel>
            <BirthDateGroup aria-labelledby="birth-date-label">
              <BirthDateGrid>
                <BirthInputLabel>
                  <BirthInputText>연도</BirthInputText>
                  <BirthInput
                    value={birthYear}
                    onChange={(event) =>
                      setBirthYear(getDigitsOnly(event.target.value, 4))
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="bday-year"
                    placeholder="2011"
                    aria-label="태어난 연도"
                  />
                </BirthInputLabel>
                <BirthInputLabel>
                  <BirthInputText>월</BirthInputText>
                  <BirthInput
                    value={birthMonth}
                    onChange={(event) =>
                      setBirthMonth(getDigitsOnly(event.target.value, 2))
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="bday-month"
                    placeholder="1"
                    aria-label="태어난 월"
                  />
                </BirthInputLabel>
                <BirthInputLabel>
                  <BirthInputText>일</BirthInputText>
                  <BirthInput
                    value={birthDay}
                    onChange={(event) =>
                      setBirthDay(getDigitsOnly(event.target.value, 2))
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="bday-day"
                    placeholder="19"
                    aria-label="태어난 일"
                  />
                </BirthInputLabel>
              </BirthDateGrid>
            </BirthDateGroup>
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <FiHome aria-hidden="true" />
              어디 살아?
            </FieldLabel>
            <ResidenceButton
              type="button"
              $hasValue={!!residence}
              onClick={() => {
                setResidenceSearch('');
                setResidenceModalOpen(true);
              }}
            >
              <FiSearch aria-hidden="true" />
              <span>{residence || '너가 살고 있는 동네를 알려줘'}</span>
            </ResidenceButton>
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <FiUsers aria-hidden="true" />
              친구들과 함께 왔니?
            </FieldLabel>
            <CounterGrid>
              <CounterCard $tone="mint">
                <CounterLabel>
                  <FaMars aria-hidden="true" />
                  남자
                </CounterLabel>
                <CounterControls>
                  <CounterButton
                    type="button"
                    aria-label="남자 인원 줄이기"
                    onClick={() =>
                      setMaleCount((count) => Math.max(0, count - 1))
                    }
                  >
                    <FiMinus />
                  </CounterButton>
                  <CounterValue>{maleCount}</CounterValue>
                  <CounterButton
                    type="button"
                    aria-label="남자 인원 늘리기"
                    onClick={() => setMaleCount((count) => count + 1)}
                    $primary
                  >
                    <FiPlus />
                  </CounterButton>
                </CounterControls>
              </CounterCard>

              <CounterCard $tone="pink">
                <CounterLabel>
                  <FaVenus aria-hidden="true" />
                  여자
                </CounterLabel>
                <CounterControls>
                  <CounterButton
                    type="button"
                    aria-label="여자 인원 줄이기"
                    onClick={() =>
                      setFemaleCount((count) => Math.max(0, count - 1))
                    }
                  >
                    <FiMinus />
                  </CounterButton>
                  <CounterValue>{femaleCount}</CounterValue>
                  <CounterButton
                    type="button"
                    aria-label="여자 인원 늘리기"
                    onClick={() => setFemaleCount((count) => count + 1)}
                    $primary
                  >
                    <FiPlus />
                  </CounterButton>
                </CounterControls>
              </CounterCard>
            </CounterGrid>
          </FieldBlock>

          <Agreement>
            <AgreementTitle>
              개인정보 수집 및 이용 동의
              <AgreementCheckbox
                type="checkbox"
                checked={privacyAgreed}
                onChange={(event) => setPrivacyAgreed(event.target.checked)}
                aria-label="개인정보 수집 및 이용 동의"
              />
            </AgreementTitle>
            <AgreementDetail>
              {`(이름, 성별, 생년월일, 연락처, 거주지, 방문 목적, 방문 인원, CCTV 촬영)`}
            </AgreementDetail>
          </Agreement>

          <SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '다 했어요! 🎉'}
          </SubmitButton>
        </FormBody>
      </Panel>
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
      {residenceModalOpen &&
        createPortal(
          <ResidenceOverlay onClick={() => setResidenceModalOpen(false)}>
            <ResidencePanel onClick={(e) => e.stopPropagation()}>
              <ResidenceHeader>
                <ResidenceTitleRow>
                  <ResidenceModalTitle>
                    <FiHome aria-hidden="true" /> 어디 살아?
                  </ResidenceModalTitle>
                  <ResidenceCloseButton
                    type="button"
                    onClick={() => setResidenceModalOpen(false)}
                    aria-label="거주지 선택 닫기"
                  >
                    <FiX aria-hidden="true" />
                  </ResidenceCloseButton>
                </ResidenceTitleRow>
                <ResidenceSearchRow>
                  <ResidenceSearchInput
                    autoFocus
                    value={residenceSearch}
                    onChange={(e) => setResidenceSearch(e.target.value)}
                    placeholder="눌러서 거주지를 검색해줘"
                  />
                  <FiSearch aria-hidden="true" />
                </ResidenceSearchRow>
              </ResidenceHeader>
              <ResidenceList>
                {filteredResidences.length > 0 ? (
                  filteredResidences.map((r) => (
                    <ResidenceItem
                      key={r.id}
                      type="button"
                      $selected={residence === r.residence}
                      onClick={() => {
                        setResidence(r.residence);
                        setResidenceModalOpen(false);
                      }}
                    >
                      <span>{r.residence}</span>
                      {residence === r.residence && <ResidenceItemDot />}
                    </ResidenceItem>
                  ))
                ) : isResidenceLoading ? (
                  <ResidenceNotice>거주지를 불러오는 중입니다.</ResidenceNotice>
                ) : isResidenceError ? (
                  <ResidenceNotice>
                    거주지를 불러오지 못했습니다.
                  </ResidenceNotice>
                ) : (
                  <ResidenceNotice>검색된 거주지가 없습니다.</ResidenceNotice>
                )}
              </ResidenceList>
            </ResidencePanel>
          </ResidenceOverlay>,
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

const FieldBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FieldLabel = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  color: #26364c;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;

  svg {
    color: #1f63b7;
  }
`;

const TextInput = styled.input`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: #26364c;
  font-size: 1rem;
  outline: none;
  padding: 0 1.8rem;

  &::placeholder {
    color: #747b86;
  }

  &:focus {
    box-shadow: 0 0.35rem 0 #9fc4e7;
  }
`;

const BirthDateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BirthDateGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.9rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BirthInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
`;

const BirthInputText = styled.span`
  color: #26364c;
  font-size: 0.86rem;
`;

const BirthInput = styled.input`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 1.25rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: #26364c;
  font-size: 1rem;
  outline: none;
  padding: 0 1.2rem;

  &::placeholder {
    color: #8b95a3;
  }

  &:focus {
    box-shadow: 0 0.35rem 0 #9fc4e7;
  }
`;

const toneShadow = {
  peach: '#f7d9be',
  mint: '#c5dedb',
  blue: '#ccd9ea',
  pink: '#f8cbd5',
} as const;

const toneColor = {
  peach: '#f28d31',
  mint: '#00a89d',
  blue: '#2868d8',
  pink: '#ef4b75',
} as const;

const selectedBackground = {
  peach: '#fff5ec',
  mint: '#effbf9',
  blue: '#f0f6ff',
  pink: '#fff1f5',
} as const;

const selectedRing = {
  peach: 'rgba(242, 141, 49, 0.18)',
  mint: 'rgba(0, 168, 157, 0.18)',
  blue: 'rgba(40, 104, 216, 0.18)',
  pink: 'rgba(239, 75, 117, 0.18)',
} as const;

const OptionGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 920px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const OptionCard = styled.button<{ $tone: Tone; $selected?: boolean }>`
  min-height: 6.6rem;
  border: 0.15rem solid
    ${({ $selected, $tone }) => ($selected ? toneColor[$tone] : 'transparent')};
  border-radius: 1.3rem;
  background-color: ${({ $selected, $tone }) =>
    $selected ? selectedBackground[$tone] : '#fbfbff'};
  box-shadow: 0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]},
    ${({ $selected, $tone }) =>
      $selected
        ? `0 0 0 0.22rem ${selectedRing[$tone]}`
        : '0 0 0 0 transparent'};
  color: #222831;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.85rem;
`;

const OptionIcon = styled.span<{ $tone: Tone }>`
  color: ${({ $tone }) => toneColor[$tone]};
  font-size: 1rem;
`;

const PurposeCard = styled.button<{ $tone: Tone; $selected?: boolean }>`
  min-height: 6.6rem;
  border: 0.15rem solid
    ${({ $selected, $tone }) => ($selected ? toneColor[$tone] : 'transparent')};
  border-radius: 1.3rem;
  background-color: ${({ $selected, $tone }) =>
    $selected ? selectedBackground[$tone] : '#fbfbff'};
  box-shadow: 0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]},
    ${({ $selected, $tone }) =>
      $selected
        ? `0 0 0 0.22rem ${selectedRing[$tone]}`
        : '0 0 0 0 transparent'};
  color: #222831;
  cursor: pointer;
  font-size: clamp(0.72rem, 0.8vw, 0.82rem);
  font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
  letter-spacing: 0;
  line-height: 1;
  overflow: hidden;
  padding: 0 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PurposeNotice = styled.p`
  min-height: 4rem;
  border-radius: 1.3rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #ccd9ea;
  color: #26364c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 700;
`;

const CounterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const CounterCard = styled.div<{ $tone: Tone }>`
  min-height: 4.3rem;
  border-radius: 2.2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0 0.9rem;
  }
`;

const CounterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #222831;
  flex-shrink: 0;
  font-weight: 700;
  white-space: nowrap;

  svg {
    color: #00a89d;
    font-size: 1.2rem;
  }
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const CounterButton = styled.button<{ $primary?: boolean }>`
  width: 2.8rem;
  height: 2.8rem;
  border: 0;
  border-radius: 50%;
  background-color: ${({ $primary }) => ($primary ? '#135cad' : '#ffffff')};
  color: ${({ $primary }) => ($primary ? '#ffffff' : '#7f8a99')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  box-shadow: 0 0.2rem 0 rgba(31, 99, 183, 0.12);
`;

const CounterValue = styled.span`
  min-width: 1.5rem;
  color: #1f63b7;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;

const Agreement = styled.div`
  text-align: center;
`;

const AgreementTitle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #222831;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
`;

const AgreementCheckbox = styled.input`
  width: 1.05rem;
  height: 1.05rem;
  appearance: none;
  border: 0.1rem solid #c8d5e6;
  border-radius: 0.15rem;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;

  &:checked {
    border-color: #37c4f4;
    background-color: #37c4f4;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    inset: 0;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 800;
    line-height: 1.05rem;
    text-align: center;
  }

  &:focus-visible {
    outline: 0.2rem solid rgba(55, 196, 244, 0.28);
    outline-offset: 0.15rem;
  }
`;

const AgreementDetail = styled.p`
  margin: 0.65rem 0 0;
  color: #7f8793;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  min-height: 4.6rem;
  border: 0;
  border-radius: 2.3rem;
  background-color: #145cad;
  box-shadow: 0 0.35rem 0 #c9d7e8;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
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

const ResidenceButton = styled.button<{ $hasValue: boolean }>`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: ${({ $hasValue }) => ($hasValue ? '#26364c' : '#747b86')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  font-family: inherit;
  font-size: 1rem;
  padding: 0 1.8rem;
  text-align: left;

  svg {
    color: #1f63b7;
    flex-shrink: 0;
  }
`;

const ResidenceOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ResidencePanel = styled.div`
  width: min(100%, 28rem);
  max-height: 70dvh;
  border-radius: 1.5rem;
  background: #ffffff;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ResidenceHeader = styled.div`
  background: #eef3fb;
  padding: 1.4rem 1.6rem 1.5rem;
`;

const ResidenceTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
`;

const ResidenceModalTitle = styled.h2`
  margin: 0;
  color: #26364c;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    color: #1f63b7;
    flex-shrink: 0;
  }
`;

const ResidenceCloseButton = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  color: #1f63b7;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.15rem;

  &:focus-visible {
    outline: 0.2rem solid rgba(31, 99, 183, 0.28);
    outline-offset: 0.12rem;
  }
`;

const ResidenceSearchRow = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #1f63b7;
    font-size: 1.2rem;
    pointer-events: none;
  }
`;

const ResidenceSearchInput = styled.input`
  width: 100%;
  height: 3.1rem;
  box-sizing: border-box;
  border: 1px solid #c9dcf2;
  border-radius: 1.55rem;
  background: #ffffff;
  color: #26364c;
  font-family: inherit;
  font-size: 0.875rem;
  outline: none;
  padding: 0 2.8rem 0 1.3rem;

  &::placeholder {
    color: #9aa4b2;
  }

  &:focus {
    border-color: #1f63b7;
  }
`;

const ResidenceList = styled.div`
  overflow-y: auto;
  padding: 0;
`;

const ResidenceNotice = styled.p`
  margin: 0;
  color: #5d6878;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 1.2rem 1.6rem;
  text-align: center;
`;

const ResidenceItem = styled.button<{ $selected: boolean }>`
  width: 100%;
  border: 0;
  border-bottom: 1px solid #f0f2f5;
  background: transparent;
  color: #26364c;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  padding: 0.85rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: #f5f8ff;
  }
`;

const ResidenceItemDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #e64d8c;
  flex-shrink: 0;
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
