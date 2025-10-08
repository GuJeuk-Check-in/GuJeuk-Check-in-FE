import TabButton from '../Button/TabButton';
import VisitFormInput from '../LabeldInput/VisitFormInput';
import ToggleSelect from '../LabeldInput/ToggleSelect';
import { useState } from 'react';
import styled from '@emotion/styled';
import GenderInput from '../LabeldInput/GenderInput';
import { GoNumber } from 'react-icons/go';
import { IoIosCall } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';

const VisitForm = () => {
  const [activeTab, setActiveTab] = useState('대표자');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState('');
  const [perpose, setPerpose] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [agreePersonal, setAgreePersonal] = useState(true);

  return (
    <Container>
      <TabWrapper>
        <TabButton
          label="대표자"
          isActive={activeTab === '대표자'}
          onClick={() => setActiveTab('대표자')}
        />
        <TabButton
          label="동행인"
          isActive={activeTab === '동행인'}
          onClick={() => setActiveTab('동행인')}
        />
      </TabWrapper>
      <InputGroup>
        <InputRow>
          <VisitFormInput
            width="430px"
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
            width="400px"
          />
        </InputRow>
        <VisitFormInput
          width="880px"
          label="연락처"
          placeholder="연락처를 입력해주세요 ex) 010-1234-5678"
          icon={<IoIosCall size={24} />}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <GenderInput
          width="880px"
          value={gender}
          onChange={(selectedGender) => setGender(selectedGender)}
        />
        <ToggleSelect
          label="방문 목적"
          options={[
            '게임',
            '독서',
            '동아리',
            '댄스',
            '노래방',
            '미디어',
            '기타',
          ]}
          value={perpose}
          onChange={setPerpose}
          width="850px"
        />
        <VisitFormInput
          width="880px"
          label="방문 날짜"
          placeholder="방문 날짜를 선택해주세요."
          icon={<FaCalendarDays size={24} />}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <PrivacyConsentWrapper>
          <Checkbox
            type="checkbox"
            checked={agreePersonal}
            onChange={(e) => setAgreePersonal(e.target.checked)}
          />
          <ConsentText>개인정보 수집 및 이용 동의</ConsentText>
        </PrivacyConsentWrapper>
      </InputGroup>
    </Container>
  );
};

export default VisitForm;

const Container = styled.div`
  width: 58.33vw;
  height: 102.04vh;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const PrivacyConsentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
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
