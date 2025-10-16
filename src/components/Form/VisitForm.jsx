import VisitFormInput from '../LabeldInput/VisitFormInput';
import ToggleSelect from '../LabeldInput/ToggleSelect';
import { useState } from 'react';
import styled from '@emotion/styled';
import CountVisitor from '../LabeldInput/CountVisitor';
import { IoIosCall } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import PasswordButton from '../Button/PasswordButton';
import useVisitStore from '../../store/useVisitStore';
import { useNavigate } from 'react-router-dom';
import VisitDatePicker from '../LabeldInput/VisitDatePicker';
import usePurposeStore from '../../store/PurposeStore';

const VisitForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState('');
  const [purpose, setPurpose] = useState('');
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [date, setDate] = useState('');
  const [agreePersonal, setAgreePersonal] = useState(true);

  const addVisit = useVisitStore((state) => state.addVisit);
  const { purposes } = usePurposeStore();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!name || !number || !purpose || !date) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (male + female < 1) {
      alert('최소 1명 이상의 방문객을 입력해주세요.');
      return;
    }

    if (!agreePersonal) {
      alert('개인정보 수집 및 이용에 동의해야 합니다.');
      return;
    }

    const newVisit = {
      id: Date.now(),
      name,
      male: male.toString(),
      female: female.toString(),
      date,
      age,
      number,
      purpose,
    };

    addVisit(newVisit);

    alert('시설 이용 신청이 추가되었습니다!');
    navigate('/user-visit-list');

    setName('');
    setAge('');
    setNumber('');
    setPurpose('');
    setDate('');
    setAgreePersonal(true);
  };

  const purposeOptions = purposes.map((p) => p.label);

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
            options={[
              '0~8세',
              '9~13세',
              '14~16세',
              '17~19세',
              '20~24세',
              '성인',
            ]}
            value={age}
            onChange={setAge}
          />
        </InputRow>

        <VisitFormInput
          label="연락처"
          placeholder="연락처를 입력해주세요 ex) 010-1234-5678"
          icon={<IoIosCall size={24} />}
          value={number}
          onChange={(e) =>
            setNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))
          }
        />

        <ToggleSelect
          label="방문 목적"
          options={purposeOptions.length > 0 ? purposeOptions : ['기타']}
          placeholder="방문 목적을 선택해주세요"
          value={purpose}
          onChange={setPurpose}
          icon={<FaLocationDot size={24} />}
        />

        <CountVisiorWrapper>
          <CountVisitor
            label="방문 남성 수"
            placeholder="성별을 선택해주세요"
            value={male}
            onChange={setMale}
          />
          <CountVisitor
            label="방문 여성 수"
            placeholder="성별을 선택해주세요"
            value={female}
            onChange={setFemale}
          />
        </CountVisiorWrapper>

        <VisitDatePicker value={date} onChange={setDate} />

        <PrivacyConsentWrapper>
          <Checkbox
            type="checkbox"
            checked={agreePersonal}
            onChange={(e) => setAgreePersonal(e.target.checked)}
          />
          <ConsentText>개인정보 수집 및 이용 동의</ConsentText>
        </PrivacyConsentWrapper>
      </InputGroup>

      <PasswordButton content="추가" onClick={handleAdd} />
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
