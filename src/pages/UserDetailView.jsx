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
import ToggleSelect from '../components/LabeldInput/ToggleSelect';
import CountVisitor from '../components/LabeldInput/CountVisitor';
import VisitDatePicker from '../components/LabeldInput/VisitDatePicker';
import { usePurposeList } from '../hooks/usePurposeList';

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

const AGE_DISPLAY_LABELS = AGE_OPTIONS.map((opt) => opt.label);

const ActionButton = ({ content, onClick, disabled }) => (
  <PasswordButton content={content} onClick={onClick} disabled={disabled} />
);

const UserDetailView = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    data: visit,
    isLoading: isVisitLoading,
    isError: isVisitError,
    error,
  } = usefetchUserVisitDetail(id);
  const updateMutation = useUpdateAdminItem();

  const {
    data: purposes = [],
    isLoading: isPurposesLoading,
    isError: isPurposesError,
  } = usePurposeList();

  const purposeOptions = Array.isArray(purposes)
    ? purposes.map((p) => p.purpose)
    : [];

  useEffect(() => {
    if (visit) {
      setFormData({
        id: visit.id || '',
        name: visit.name || '',
        age: visit.age || 'ADULT',
        phone: visit.phone || '',
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

  const getAgeLabelFromEnum = (ageEnum) => {
    const option = AGE_OPTIONS.find((opt) => opt.value === ageEnum);
    return option ? option.label : ageEnum;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (isoString) => {
    setFormData((prev) => ({
      ...prev,
      visitDate: isoString,
    }));
  };

  const handleAgeChange = (ageLabel) => {
    const ageEnum =
      AGE_OPTIONS.find((opt) => opt.label === ageLabel)?.value || ageLabel;
    setFormData((prev) => ({
      ...prev,
      age: ageEnum,
    }));
  };

  const handleEditToggle = () => {
    if (isPurposesLoading) return;
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData) return;

    if (
      !formData.name ||
      !formData.phone ||
      !formData.purpose.trim() ||
      !formData.visitDate
    ) {
      console.error('필수 필드를 모두 입력해야 합니다.');
      return;
    }

    const dataToUpdate = {
      id: formData.id,
      name: formData.name,
      age: formData.age || 'ADULT',
      phone: formData.phone,
      maleCount: Number(formData.maleCount),
      femaleCount: Number(formData.femaleCount),
      purpose: formData.purpose,
      visitDate: formData.visitDate,
      privacyAgreed: formData.privacyAgreed,
    };

    updateMutation.mutate(dataToUpdate, {
      onSuccess: () => {
        alert('수정이 완료되었습니다.');
        window.location.reload();
      },
      onError: (err) => {
        console.error(
          `수정 실패: ${err.message}` || '알 수 없는 오류가 발생했습니다.'
        );
      },
    });
  };

  const handleCancel = () => {
    if (visit) {
      setFormData({
        id: visit.id,
        name: visit.name || '',
        age: visit.age || 'ADULT',
        phone: visit.phone || '',
        maleCount: visit.maleCount || 0,
        femaleCount: visit.femaleCount || 0,
        purpose: visit.purpose || '',
        visitDate: visit.visitDate || '',
        privacyAgreed: visit.privacyAgreed || false,
      });
    }
    setIsEditing(false);
  };

  if (isVisitLoading || isPurposesLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <LoadingText>
            {isPurposesLoading
              ? '목적 목록을 불러오는 중...'
              : '상세 기록을 불러오는 중...'}
          </LoadingText>
        </Wrapper>
      </Container>
    );
  }

  if (isVisitError || isPurposesError) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <ErrorText>
            기록 조회에 실패했습니다:{' '}
            {error?.message || '방문 목적 목록을 불러오는 데 실패했습니다.'}
          </ErrorText>
        </Wrapper>
      </Container>
    );
  }

  if (!visit || !formData)
    return <p>기록을 찾을 수 없거나 데이터를 준비하는 중입니다.</p>;

  const ageDisplayLabel = formatAgeDisplay(visit.age);
  const formattedPhone = formatPhoneNumber(visit.phone);

  return (
    <Container>
      <UseBackground />
      <Header title={`시설 이용 ${isEditing ? '수정' : '상세 조회'}`} />
      <Wrapper>
        <InputRow>
          <VisitDetailInput
            label="대표자 이름"
            name="name"
            value={isEditing ? formData.name : visit.name}
            onChange={isEditing ? handleChange : null}
            isEditable={isEditing}
          />
          {isEditing ? (
            <ToggleSelectWrapper>
              <ToggleSelect
                label="연령"
                options={AGE_DISPLAY_LABELS}
                value={getAgeLabelFromEnum(formData.age)}
                onChange={handleAgeChange}
              />
            </ToggleSelectWrapper>
          ) : (
            <VisitDetailInput
              label="연령"
              value={ageDisplayLabel}
              isEditable={false}
            />
          )}
        </InputRow>
        <VisitDetailInput
          label="연락처"
          name="phone"
          value={isEditing ? formData.phone : formattedPhone}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
          type="tel"
        />
        {isEditing ? (
          <ToggleSelect
            label="방문 목적"
            options={
              isPurposesLoading
                ? ['목록 불러오는 중...']
                : purposeOptions.length > 0
                ? purposeOptions
                : ['관리자 설정 목록 없음']
            }
            placeholder="방문 목적을 선택해주세요"
            value={formData.purpose}
            onChange={(value) =>
              handleChange({ target: { name: 'purpose', value } })
            }
            disabled={isPurposesLoading}
          />
        ) : (
          <VisitDetailInput
            label="방문 목적"
            value={visit.purpose}
            isEditable={false}
          />
        )}
        {isEditing ? (
          <VisitDatePicker
            value={formData.visitDate}
            onChange={handleDateChange}
          />
        ) : (
          <VisitDetailInput
            label="방문 날짜"
            value={visit.visitDate}
            isEditable={false}
          />
        )}
        <CountVisiorWrapper>
          {isEditing ? (
            <>
              <CountVisitor
                label="방문 남성 수"
                value={formData.maleCount}
                onChange={(value) =>
                  handleChange({ target: { name: 'maleCount', value } })
                }
              />
              <CountVisitor
                label="방문 여성 수"
                value={formData.femaleCount}
                onChange={(value) =>
                  handleChange({ target: { name: 'femaleCount', value } })
                }
              />
            </>
          ) : (
            <>
              <VisitDetailInput
                label="방문 남성 수"
                value={visit.maleCount}
                isEditable={false}
                width="50%"
              />
              <VisitDetailInput
                label="방문 여성 수"
                value={visit.femaleCount}
                isEditable={false}
                width="50%"
              />
            </>
          )}
        </CountVisiorWrapper>
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
                disabled={updateMutation.isLoading || isPurposesLoading}
              />
              <ActionButton
                content="취소"
                onClick={handleCancel}
                disabled={updateMutation.isLoading}
              />
            </>
          ) : (
            <ActionButton
              content="수정"
              onClick={handleEditToggle}
              disabled={isPurposesLoading}
            />
          )}
        </CustomButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default UserDetailView;

const Container = styled.div`
  padding-top: 6.375rem;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 59.375rem;
  margin: 2.5rem auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
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

const CountVisiorWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  margin: 3.125rem 0;
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
  gap: 0.625rem;
  margin-top: 1.25rem;
`;

const ToggleSelectWrapper = styled.div`
  flex: 1;
`;
