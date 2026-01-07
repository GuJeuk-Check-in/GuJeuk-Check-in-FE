import VisitFormInput from '../LabeldInput/VisitFormInput';
import ToggleSelect from '../LabeldInput/ToggleSelect';
import { useState } from 'react';
import styled from '@emotion/styled';
import CountVisitor from '../LabeldInput/CountVisitor';
import { IoIosCall } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import PasswordButton from '../Button/PasswordButton';
import VisitDatePicker from '../LabeldInput/VisitDatePicker';
import { usePurposeList } from '../../api/purpose/hooks/usePurposeList';
import { PiStudentBold } from 'react-icons/pi';
import { useInput } from '../../hooks/useInput';
import { sanitizePhoneNumber } from '../../utils/formatters';
import { useCheck } from '../../hooks/useCheck';
import { useCounter } from '../../hooks/useCounter';
import React from 'react';

interface VisitFormProps {
  onSubmit: (data: {
    name: string;
    age: string;
    phone: string;
    maleCount: number;
    femaleCount: number;
    purpose: string;
    visitDate: string;
    privacyAgreed: boolean;
  }) => void;
  isLoading: boolean;
  isError: boolean;
  error: any;
  onChange?: () => void;
}
const VisitForm = ({ onSubmit, isLoading, isError, error }: VisitFormProps) => {
  const AGE_MAP = {
    '0~8세': 'BABY',
    '9~13세': 'AGE_9_13',
    '14~16세': 'AGE_14_16',
    '17~19세': 'AGE_17_19',
    '20~24세': 'AGE_20_24',
    성인: 'ADULT',
  };

  type AgeDisplayType = keyof typeof AGE_MAP;

  const nameInput = useInput('');
  const phoneInput = useInput('', sanitizePhoneNumber);
  const [ageDisplay, setAgeDisplay] = useState('');
  const [purpose, setPurpose] = useState('');
  const maleCounter = useCounter(0);
  const femaleCounter = useCounter(0);
  const [date, setDate] = useState('');
  const privacyCheck = useCheck(true);
  const { data: purposes, isLoading: isPurposeLoading } = usePurposeList();

  const handleSubmit = () => {
    const trimmedPurpose = purpose.trim();
    if (
      !nameInput.value ||
      !phoneInput.value ||
      !trimmedPurpose ||
      !purpose ||
      !date ||
      !ageDisplay
    ) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    if (!privacyCheck.checked) {
      alert('개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }

    const dataToSend = {
      name: nameInput.value,
      age: AGE_MAP[ageDisplay as AgeDisplayType],
      phone: phoneInput.value,
      maleCount: maleCounter.count,
      femaleCount: femaleCounter.count,
      purpose: trimmedPurpose,
      visitDate: date,
      privacyAgreed: privacyCheck.checked,
    };

    onSubmit(dataToSend);

    nameInput.reset();
    setAgeDisplay('');
    phoneInput.reset();
    setPurpose('');
    maleCounter.reset();
    femaleCounter.reset();
    setDate('');
    privacyCheck.setChecked(true);
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
            {...nameInput}
          />
          <ToggleSelect
            label="연령"
            options={ageOptions}
            value={ageDisplay}
            onChange={setAgeDisplay}
            icon={<PiStudentBold size={24} />}
          />
        </InputRow>

        <VisitFormInput
          label="연락처"
          placeholder="연락처를 입력해주세요 ex) 01012345678"
          icon={<IoIosCall size={24} />}
          {...phoneInput}
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
          disable={isLoading || isPurposeLoading || !purposeOptions.length}
        />

        <CountVisiorWrapper>
          <CountVisitor
            label="방문 남성 수"
            value={maleCounter.count}
            onChange={maleCounter.setCount}
          />
          <CountVisitor
            label="방문 여성 수"
            value={femaleCounter.count}
            onChange={femaleCounter.setCount}
          />
        </CountVisiorWrapper>

        <VisitDatePicker value={date} onChange={setDate} />

        <PrivacyConsentWrapper>
          <Checkbox
            type="checkbox"
            checked={privacyCheck.checked}
            onChange={privacyCheck.onChange}
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
        disable={isLoading || isPurposeLoading}
      />
    </Container>
  );
};

export default VisitForm;

const Container = styled.div`
  width: 90%;
  max-width: 59.375rem;
  height: auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const PrivacyConsentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  appearance: none;
  border: 0.125rem solid #d1d8e0;
  border-radius: 0.25rem;
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
    font-size: 1rem;
  }
`;

const ConsentText = styled.span`
  font-size: 1rem;
  color: #6e7680;
`;

const CountVisiorWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: -0.625rem;
  text-align: center;
  width: 100%;
`;
