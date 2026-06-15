import styled from '@emotion/styled';
import { PasswordBackground } from '@shared/ui/Background';
import { useState } from 'react';
import {
  FaGraduationCap,
  FaMars,
  FaRegCheckSquare,
  FaRegSmile,
  FaVenus,
} from 'react-icons/fa';
import { FiMinus, FiPhone, FiPlus, FiUser, FiUsers } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';

const ageOptions = [
  { label: '1~7세', tone: 'peach', icon: <FaRegSmile /> },
  { label: '8 ~ 13세', tone: 'mint', icon: <FaRegSmile /> },
  { label: '14 ~ 16세', tone: 'blue', icon: <FaGraduationCap /> },
  { label: '17 ~ 19세', tone: 'peach', icon: <FaRegSmile /> },
  { label: '20세 이상', tone: 'mint', icon: <FaRegSmile /> },
] as const;

const purposeOptions = [
  { label: '천친마루(게임, 독서 등)', tone: 'peach' },
  { label: '난장마루(노래방 최대 4명)', tone: 'mint' },
  { label: '잔치마루(노래방 최대 8명)', tone: 'blue' },
  { label: '천친마루(게임, 독서 등)', tone: 'peach' },
  { label: '창작마루(방송실)', tone: 'mint' },
  { label: '통통마루(댄스연습실)', tone: 'peach' },
  { label: '난장마루(노래방 최대 4명)', tone: 'mint' },
] as const;

type Tone = 'peach' | 'mint' | 'blue' | 'pink';

const CheckInFormPage = () => {
  const [gender, setGender] = useState<'남자' | '여자' | null>(null);
  const [age, setAge] = useState('');
  const [purposeIndex, setPurposeIndex] = useState<number | null>(null);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  return (
    <Page>
      <PasswordBackground />
      <Panel>
        <Header>
          <Title>
            <Highlight>구즉</Highlight> 청소년문화의 집에 온걸 환영해~!
          </Title>
          <Subtitle>시설을 이용하려면 작성해줘</Subtitle>
        </Header>

        <FormBody aria-label="시설 이용 정보 입력">
          <FieldBlock>
            <FieldLabel>
              <FiUser aria-hidden="true" />
              이름이 뭐야?
            </FieldLabel>
            <TextInput placeholder="친구의 이름을 알려줘" />
          </FieldBlock>

          <TwoColumn>
            <FieldBlock>
              <FieldLabel>
                <FiPhone aria-hidden="true" />
                전화번호가 뭐야?
              </FieldLabel>
              <TextInput placeholder="010-0000-0000" />
            </FieldBlock>

            <FieldBlock>
              <FieldLabel>
                <FiUsers aria-hidden="true" />
                성별이 뭐야?
              </FieldLabel>
              <SegmentGroup>
                <SegmentButton
                  type="button"
                  $tone="mint"
                  $selected={gender === '남자'}
                  onClick={() => setGender('남자')}
                >
                  <FaMars aria-hidden="true" />
                  남자
                </SegmentButton>
                <SegmentButton
                  type="button"
                  $tone="pink"
                  $selected={gender === '여자'}
                  onClick={() => setGender('여자')}
                >
                  <FaVenus aria-hidden="true" />
                  여자
                </SegmentButton>
              </SegmentGroup>
            </FieldBlock>
          </TwoColumn>

          <FieldBlock>
            <FieldLabel>
              <FaRegCheckSquare aria-hidden="true" />
              몇 살이야?
            </FieldLabel>
            <OptionGrid $columns={5}>
              {ageOptions.map((option) => (
                <OptionCard
                  key={option.label}
                  type="button"
                  $tone={option.tone}
                  $selected={age === option.label}
                  onClick={() => setAge(option.label)}
                >
                  <OptionIcon $tone={option.tone}>{option.icon}</OptionIcon>
                  <span>{option.label}</span>
                </OptionCard>
              ))}
            </OptionGrid>
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <IoRocketOutline aria-hidden="true" />
              오늘은 무엇을 하러 왔어?
            </FieldLabel>
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
              (이름,생년월일,연락처,방문 목적,성별,cctv 촬영,거주지)
            </AgreementDetail>
          </Agreement>

          <SubmitButton type="button">다 했어요! 🎉</SubmitButton>
        </FormBody>
      </Panel>
      <Footer>made by Busurker</Footer>
    </Page>
  );
};

export default CheckInFormPage;

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

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const SegmentGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

const SegmentButton = styled.button<{ $tone: Tone; $selected?: boolean }>`
  height: 4rem;
  border: 0.15rem solid
    ${({ $selected, $tone }) => ($selected ? toneColor[$tone] : 'transparent')};
  border-radius: 2rem;
  background-color: ${({ $selected, $tone }) =>
    $selected ? selectedBackground[$tone] : '#fbfbff'};
  box-shadow:
    0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]},
    ${({ $selected, $tone }) =>
      $selected
        ? `0 0 0 0.22rem ${selectedRing[$tone]}`
        : '0 0 0 0 transparent'};
  color: #222831;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 1rem;
  font-weight: 700;

  svg {
    color: ${({ $tone }) => toneColor[$tone]};
    font-size: 1.25rem;
  }
`;

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
  box-shadow:
    0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]},
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
  box-shadow:
    0 0.35rem 0 ${({ $tone }) => toneShadow[$tone]},
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
