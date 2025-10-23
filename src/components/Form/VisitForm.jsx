import VisitFormInput from '../LabeldInput/VisitFormInput';
import ToggleSelect from '../LabeldInput/ToggleSelect';
import { useState } from 'react';
import styled from '@emotion/styled';
import CountVisitor from '../LabeldInput/CountVisitor';
import { IoIosCall } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import PasswordButton from '../Button/PasswordButton';
import VisitDatePicker from '../LabeldInput/VisitDatePicker';
import { usePurposeList } from '../../hooks/usePurposeList';

const VisitForm = ({ onSubmit, isLoading, isError, error }) => {
  const AGE_MAP = {
    '0~8세': 'BABY',
    '9~13세': 'AGE_9_13',
    '14~16세': 'AGE_14_16',
    '17~19세': 'AGE_17_19',
    '20~24세': 'AGE_20_24',
    성인: 'ADULT',
  };

  const [name, setName] = useState('');
  const [ageDisplay, setAgeDisplay] = useState('');
  const [number, setNumber] = useState('');
  const [purpose, setPurpose] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [date, setDate] = useState('');
  const [agreePersonal, setAgreePersonal] = useState(true);
  const { data: purposes, isLoading: isPurposeLoading } = usePurposeList();

  const handleSubmit = () => {
    const trimmedPurpose = purpose.trim();
    if (
      !name ||
      !number ||
      !trimmedPurpose ||
      !purpose ||
      !date ||
      !ageDisplay
    ) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    if (!agreePersonal) {
      alert('개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }

    const dataToSend = {
      name: name,
      age: AGE_MAP[ageDisplay],
      phone: number,
      maleCount: maleCount,
      femaleCount: femaleCount,
      purpose: trimmedPurpose,
      visitDate: date,
      privacyAgreed: agreePersonal,
    };

    onSubmit(dataToSend);

    setName('');
    setAgeDisplay('');
    setNumber('');
    setPurpose('');
    setMaleCount(0);
    setFemaleCount(0);
    setDate('');
    setAgreePersonal(true);
  };

  const purposeOptions = Array.isArray(purposes)
    ? purposes.map((p) => p.purpose)
    : [];
  const ageOptions = Object.keys(AGE_MAP);

  return (
    <Container>
      <InputGroup>
        <InputRow>
          <VisitFormInput
            label="이름"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ToggleSelect
            label="연령"
            options={ageOptions}
            value={ageDisplay}
            onChange={setAgeDisplay}
          />
        </InputRow>

        <VisitFormInput
          label="연락처"
          placeholder="연락처를 입력해주세요 ex) 01012345678"
          icon={<IoIosCall size={24} />}
          value={number}
          onChange={(e) =>
            setNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))
          }
        />

        <ToggleSelect
          label="방문 목적"
          options={
            isPurposeLoading
              ? ['불러오는 중...']
              : purposeOptions.length > 0
              ? purposeOptions
              : ['기타']
          }
          placeholder="방문 목적을 선택해주세요"
          value={purpose}
          onChange={setPurpose}
          icon={<FaLocationDot size={24} />}
          disabled={isLoading || isPurposeLoading || !purposeOptions.length}
        />

        <CountVisiorWrapper>
          <CountVisitor
            label="방문 남성 수"
            placeholder="성별을 선택해주세요"
            value={maleCount}
            onChange={setMaleCount}
          />
          <CountVisitor
            label="방문 여성 수"
            placeholder="성별을 선택해주세요"
            value={femaleCount}
            onChange={setFemaleCount}
          />
        </CountVisiorWrapper>

        <VisitDatePicker value={date} onChange={setDate} />

        <PrivacyConsentWrapper>
          <Checkbox
            type="checkbox"
            checked={agreePersonal}
            onChange={(e) => setAgreePersonal(e.target.checked)}
            disabled={isLoading}
          />
          <ConsentText>개인정보 수집 및 이용 동의</ConsentText>
        </PrivacyConsentWrapper>
      </InputGroup>
      {isError && (
        <ErrorMessage>
          등록에 실패했습니다: {error?.message || '알 수 없는 서버 오류.'}
        </ErrorMessage>
      )}
      <PasswordButton
        content={isLoading ? '등록 중...' : '추가'}
        onClick={handleSubmit}
        disabled={isLoading || isPurposeLoading}
      />
    </Container>
  );
};

export default VisitForm;

const Container = styled.div`
  width: 90%;
  max-width: 950px;
  height: auto;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const PrivacyConsentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #d1d8e0;
  border-radius: 4px;
  background-color: #f8f9fa;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #3f73b3;
    border-color: #3f73b3;
  }

  &:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 16px;
  }
`;

const ConsentText = styled.span`
  font-size: 16px;
  color: #6e7680;
`;

const CountVisiorWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: -10px;
  text-align: center;
  width: 100%;
`;
