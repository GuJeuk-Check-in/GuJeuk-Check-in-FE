import styled from '@emotion/styled';
import { PurposeResponse, usePurposeList } from '@entities/purpose';
import { enqueueCheckIn } from '@entities/visit';
import { CreateUserVisitRequest } from '@entities/visit';
import { PasswordBackground } from '@shared/ui/Background';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';
import { useEffect, useMemo, useState } from 'react';
import { FaExclamationTriangle, FaMars, FaVenus } from 'react-icons/fa';
import { FiArrowLeft, FiMinus, FiPlus, FiUsers } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

type Tone = 'peach' | 'mint' | 'blue' | 'pink';
const purposeTones: Tone[] = ['peach', 'mint', 'blue'];
const PURPOSE_CACHE_KEY = 'gujeuk:last-success-purposes';

const readCachedPurposes = (): PurposeResponse[] => {
  try {
    const cached = localStorage.getItem(PURPOSE_CACHE_KEY);
    if (!cached) return [];

    const parsed = JSON.parse(cached);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is PurposeResponse =>
        typeof item?.id === 'number' && typeof item?.purpose === 'string'
    );
  } catch {
    return [];
  }
};

const writeCachedPurposes = (purposes: PurposeResponse[]) => {
  try {
    localStorage.setItem(PURPOSE_CACHE_KEY, JSON.stringify(purposes));
  } catch {}
};

const formatVisitDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년${month}월${day}일`;
};

const formatVisitTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

const CheckInLoginFormPage = () => {
  const navigate = useNavigate();
  const [purposeIndex, setPurposeIndex] = useState<number | null>(null);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [cachedPurposes, setCachedPurposes] =
    useState<PurposeResponse[]>(readCachedPurposes);
  const modal = useModal();
  const {
    data: purposes = [],
    isLoading: isPurposeLoading,
    isError: isPurposeError,
  } = usePurposeList();

  useEffect(() => {
    if (purposes.length > 0) {
      setCachedPurposes(purposes);
      writeCachedPurposes(purposes);
    }
  }, [purposes]);

  const visiblePurposes = purposes.length > 0 ? purposes : cachedPurposes;

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

    const selectedPurpose =
      purposeIndex === null ? '' : purposeOptions[purposeIndex]?.label || '';

    if (!selectedPurpose || maleCount + femaleCount <= 0) {
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '입력 확인',
        subtitle: '방문 목적과 인원을 입력해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
      return;
    }

    const now = new Date();
    const payload: CreateUserVisitRequest = {
      name: null,
      age: 'ADULT',
      phone: '',
      maleCount,
      femaleCount,
      purpose: selectedPurpose,
      visitDate: formatVisitDate(now),
      visitTime: formatVisitTime(now),
      privacyAgreed: true,
    };

    try {
      setIsSaving(true);
      await enqueueCheckIn(payload);
      goToComplete();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '체크인 정보를 기기에 저장하지 못했습니다.';
      openErrorModal(message);
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
            <BackButton type="button" onClick={() => navigate(-1)} aria-label="뒤로 가기">
              <FiArrowLeft />
            </BackButton>
            <Title>반가워! 청소년문화의집에 다시 와줘서 고마워</Title>
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
                    onClick={() => setPurposeIndex(index)}
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
      <Footer>made by Busurker</Footer>
    </Page>
  );
};

export default CheckInLoginFormPage;

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
`;

const Title = styled.h1`
  margin: 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 400;
  line-height: 1.2;
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
`;

const CounterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #222831;
  font-weight: 700;

  svg {
    color: #00a89d;
    font-size: 1.2rem;
  }
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

const SubmitButton = styled.button`
  width: 100%;
  min-height: 4.6rem;
  margin-top: 2.5rem;
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
