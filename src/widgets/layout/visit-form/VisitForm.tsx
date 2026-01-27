import VisitFormInput from '@shared/ui/LabeldInput/VisitFormInput';
import ToggleSelect from '@shared/ui/LabeldInput/ToggleSelect';
import { useState } from 'react';
import styled from '@emotion/styled';
import CountVisitor from '@shared/ui/LabeldInput/CountVisitor';
import { IoIosCall } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import PasswordButton from '@shared/ui/Button/PasswordButton';
import VisitDatePicker from '@shared/ui/LabeldInput/VisitDatePicker';
import VisitTimePicker from '@shared/ui/LabeldInput/VisitTimePicker';
import { usePurposeList } from '@entities/purpose/index';
import { PiStudentBold } from 'react-icons/pi';
import { useInput } from '@shared/hooks/useInput';
import {
  sanitizePhoneNumber,
  formatPhoneNumber,
} from '../../../utils/formatters';
import { useCheck } from '@shared/hooks/useCheck';
import { useCounter } from '@shared/hooks/useCounter';

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
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: any;
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
  const phoneInput = useInput('', formatPhoneNumber);
  const [ageDisplay, setAgeDisplay] = useState('');
  const [purpose, setPurpose] = useState('');
  const maleCounter = useCounter(0);
  const femaleCounter = useCounter(0);
  const [date, setDate] = useState('');
  const privacyCheck = useCheck(true);
  const [residence, setResidence] = useState('');
  const [visitTime, setVisitTime] = useState('');


  const { data: purposes, isLoading: isPurposeLoading } = usePurposeList();

  const resetForm = () => {
    nameInput.reset();
    phoneInput.reset();
    maleCounter.reset();
    femaleCounter.reset();
    setAgeDisplay('');
    setPurpose('');
    setDate('');
    privacyCheck.setChecked(true);
  };

  const handleSubmit = async () => {
    const trimmedPurpose = purpose.trim();

    if (
      !nameInput.value ||
      !phoneInput.value ||
      !trimmedPurpose ||
      !date ||
      !ageDisplay ||
      !residence ||
      !visitTime    
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
      phone: sanitizePhoneNumber(phoneInput.value),
      residence: residence,
      maleCount: maleCounter.count,
      femaleCount: femaleCounter.count,
      purpose: trimmedPurpose,
      visitDate: date,
      visitTime: visitTime, 
      privacyAgreed: privacyCheck.checked,
    };

    try {
      await onSubmit(dataToSend);
      resetForm();
    } catch {}
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
          placeholder="연락처를 입력해주세요 ex) 010-1234-5678"
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

        <ToggleSelect
          label="거주지"
          options={['구즉동', '관평동', '노은 1동', '노은 2동', '노은 3동', '상대동', '신성동', '온천 1동', 
            '온천 2동', '원신흥동', '전민동', '진잠동', '학하동', '기타지역']}
          placeholder="거주지를 선택해주세요"
          value={residence}
          onChange={setResidence}
          icon={<FaLocationDot size={24} />}
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

        <VisitTimePicker value={visitTime} onChange={setVisitTime}/>

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
