import { useParams } from 'react-router-dom';
import Header from '../components/Form/Header';
import UseBackground from '../components/Background/UseBackground';
import VisitDetailInput from '../components/LabeldInput/VisitDetailInput';
import styled from '@emotion/styled';
import { usefetchUserVisitDetail } from '../hooks/usefetchUserVisitDetail';
import { formatPhoneNumber } from '../utils/formatters';
import { useEffect, useState } from 'react';
import { useUpdateAdminItem } from '../hooks/updateVisitList';
import PasswordButton from '../components/Button/PasswordButton';

const AGE_OPTIONS = [
  { value: 'BABY', label: '0~8세' },
  { value: 'AGE_9_13', label: '9~13세' },
  { value: 'AGE_14_16', label: '14~16세' },
  { value: 'AGE_17_19', label: '17~19세' },
  { value: 'AGE_20_24', label: '20~24세' },
  { value: 'ADULT', label: '성인' },
];

const AGE_DISPLAY_MAP = AGE_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

const UserDetailView = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    data: visit,
    isLoading,
    isError,
    error,
  } = usefetchUserVisitDetail(id);

  const updateMutation = useUpdateAdminItem();

  useEffect(() => {
    if (visit) {
      setFormData({
        id: visit.id || '',
        name: visit.name || '',
        age: visit.age || 'ADULT',
        phone: visit.phone ? parsePhoneNumber(visit.phone) : '',
        maleCount: visit.maleCount || 0,
        femaleCount: visit.femaleCount || 0,
        purpose: visit.purpose || '',
        visitDate: visit.visitDate || '',
        privacyAgreed: visit.privacyAgreed || false,
      });
    }
  }, [visit]);

  const formatAgeDisplay = (ageEnum) => {
    return AGE_DISPLAY_MAP[ageEnum] || ageEnum;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlesave = () => {
    if (!formData) return;

    updateMutation.mutate(
      {
        id: formData.id,
        name: formData.name,
        age: formData.age,
        phone: formData.phone,
        maleCount: Number(formData.maleCount),
        femaleCount: Number(formData.femaleCount),
        purpose: formData.purpose,
        visitDate: formData.visitDate,
        privacyAgreed: formData.privacyAgreed,
      },
      {
        onSuccess: () => {
          alert('수정이 완료되었습니다.');
          setIsEditing(false);
        },
        onError: (err) => {
          alert(`수정 실패: ${err.message}` || '알 수 없는 오류');
        },
      }
    );
  };

  const handleCancel = () => {
    if (visit) {
      setFormData({
        id: visit.id,
        name: visit.name || '',
        age: visit.age || 'ADULT',
        phone: visit.phone ? parsePhoneNumber(visit.phone) : '',
        maleCount: visit.maleCount || 0,
        femaleCount: visit.femaleCount || 0,
        purpose: visit.purpose || '',
        visitDate: visit.visitDate || '',
        privacyAgreed: visit.privacyAgreed || false,
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <LoadingText>상세 기록을 불러오는 중...</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <ErrorText>기록 조회에 실패했습니다: {error.message}</ErrorText>
        </Wrapper>
      </Container>
    );
  }

  if (!visit) return <p>기록을 찾을 수 없습니다.</p>;

  const ageDisplayValue = formatAgeDisplay(visit.age);
  const formattedPhone = formatPhoneNumber(visit.phone);
  const privacyAgreedDisplay = visit.privacyAgreed ? '동의 (O)' : '미동의 (X)';

  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 상세 조회" />
      <Wrapper>
        <InputRow>
          <VisitDetailInput label="대표자 이름" value={visit.name} />
          <VisitDetailInput label="연령" value={ageDisplayValue} />
        </InputRow>
        <VisitDetailInput label="연락처" value={formattedPhone} />
        <VisitDetailInput label="방문 목적" value={visit.purpose} />
        <VisitDetailInput label="방문 날짜" value={visit.visitDate} />
        <InputRow>
          <VisitDetailInput label="방문 남성 수" value={visit.maleCount} />
          <VisitDetailInput label="방문 여성 수" value={visit.femaleCount} />
        </InputRow>
        <VisitDetailInput
          label="개인 정보 수집 동의"
          name="privacyAgreed"
          value={isEditing ? formData.privacyAgreed : visit.privacyAgreed}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
          type="checkbox"
        />
        <CustomButtonWrapper>
          {isEditing ? (
            <>
              <ActionButton
                content={updateMutation.isLoading ? '저장 중...' : '저장'}
                onClick={handleSave}
                disabled={updateMutation.isLoading}
              />
              <ActionButton
                content="취소"
                onClick={handleCancel}
                disabled={updateMutation.isLoading}
              />
            </>
          ) : (
            <ActionButton content="수정" onClick={handleEditToggle} />
          )}
        </CustomButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default UserDetailView;

const Container = styled.div`
  padding-top: 9.5vh;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 950px;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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

const LoadingText = styled.p`
  text-align: center;
  margin: 50px 0;
  color: #777;
  font-size: 1.1rem;
`;

const ErrorText = styled(LoadingText)`
  color: #ff007b;
  font-weight: bold;
`;

const CustomButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const CountVisiorWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const ToggleSelectWrapper = styled.div`
  flex: 1;
`;
