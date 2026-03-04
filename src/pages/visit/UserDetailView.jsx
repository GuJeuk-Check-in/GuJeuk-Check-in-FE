import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Header } from '@widgets/GlobalLayout/index';
import { UseBackground } from '@shared/ui/Background/index';
import { VisitDetailInput } from '@shared/ui/input/VisitDetailInput';
import { PasswordButton } from '@shared/ui/Button/index';
import { ToggleSelect } from '@shared/ui/LabeldInput/ToggleSelect';
import { CountVisitor } from '@shared/ui/LabeldInput/CountVisitor';
import { VisitDatePicker } from '@shared/ui';
import { VisitTimePicker } from '@shared/ui';
import { Modal } from '@shared/ui';
import { useUpdateAdminItem } from '@features/visit/update-visit-list/model/useUpdateVisitList';
import { usePurposeList } from '@entities/purpose/index';
import { useFetchUserVisitDetail } from '@entities/visit/index';
import { useModal } from '@shared/hooks/useModal';
import { useResidenceList } from '@entities/residence';

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
  const { logId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const modal = useModal();

  const {
    data: visit,
    isLoading: isVisitLoading,
    isError: isVisitError,
    error,
  } = useFetchUserVisitDetail(logId);

  const updateMutation = useUpdateAdminItem();

  const {
    data: purposes = [],
    isLoading: isPurposesLoading,
    isError: isPurposesError,
  } = usePurposeList();

  const {
    data: residences = [],
    isLoading: isResidenceLoading,
    isError: isResidenceError,
  } = useResidenceList();

  const purposeOptions = Array.isArray(purposes)
    ? purposes.map((p) => p.purpose)
    : [];

  const residenceOptions = Array.isArray(residences)
    ? residences.map((r) => r.residence)
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
        visitTime: visit.visitTime || '',
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
    if (name === 'phone') {
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }
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
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: '입력 확인',
        subtitle: '필수 필드를 모두 입력해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
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
      residence: formData.residence,
      visitDate: formData.visitDate,
      visitTime: formData.visitTime,
      privacyAgreed: formData.privacyAgreed,
    };

    updateMutation.mutate(dataToUpdate, {
      onSuccess: () => {
        modal.openModal({
          icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
          title: '수정 완료',
          subtitle: '시설 이용 정보가 성공적으로 수정되었습니다.',
          theme: 'info',
          buttons: [
            {
              label: '확인',
              variant: 'primary',
              bgColor: '#0F50A0',
              onClick: () => {
                modal.closeModal();
                window.location.reload();
              },
            },
          ],
        });
      },
      onError: (err) => {
        modal.openModal({
          icon: <FaExclamationTriangle size={48} color="#D88282" />,
          title: '수정 실패',
          subtitle: err.message || '알 수 없는 오류가 발생했습니다.',
          theme: 'warning',
          buttons: [{ label: '닫기', onClick: modal.closeModal }],
        });
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
        residence: visit.residence || '',
        visitDate: visit.visitDate || '',
        visitTime: visit.visitTime || '',
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

  if (isVisitError || isPurposesError || isResidenceError) {
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

  if (!visit) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <LoadingText>기록을 찾을 수 없습니다.</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  const currentData = isEditing && formData ? formData : visit;
  const currentPrivacyAgreed = currentData?.privacyAgreed ?? false;

  const ageDisplayLabel = formatAgeDisplay(visit.age);

  return (
    <Container>
      <UseBackground />
      <Header title={`시설 이용 ${isEditing ? '수정' : '상세 조회'}`} />
      <Wrapper>
        <InputRow>
          <VisitDetailInput
            label="대표자 이름"
            name="name"
            value={isEditing && formData ? formData.name : visit.name}
            onChange={isEditing ? handleChange : null}
            isEditable={isEditing}
          />
          {isEditing && formData ? (
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
          value={isEditing && formData ? formData.phone : visit.phone}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
          type="tel"
        />
        {isEditing && formData ? (
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
        {isEditing && formData ? (
          <ToggleSelect
            label="거주지"
            options={residenceOptions}
            value={formData.residence}
            onChange={(value) =>
              handleChange({ target: { name: 'residence', value } })
            }
          />
        ) : (
          <VisitDetailInput
            label="거주지"
            value={visit.residence}
            isEditable={false}
          />
        )}
        {isEditing && formData ? (
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
          {isEditing && formData ? (
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

        {isEditing && formData ? (
          <VisitTimePicker
            value={formData.visitTime || ''}
            onChange={(time) =>
              setFormData((prev) => ({ ...prev, visitTime: time }))
            }
          />
        ) : (
          <VisitDetailInput
            label="방문 시간"
            value={visit.visitTime || ''}
            isEditable={false}
          />
        )}

        <CustomInputGroup>
          <CustomLabel>개인 정보 수집 동의</CustomLabel>
          <PrivacyConsentWrapper isEditable={isEditing}>
            <Checkbox
              type="checkbox"
              name="privacyAgreed"
              checked={currentPrivacyAgreed}
              onChange={isEditing ? handleChange : undefined}
              disabled={!isEditing}
            />
            <ConsentText checked={currentPrivacyAgreed}>
              {currentPrivacyAgreed ? '동의함' : '동의하지 않음'}
            </ConsentText>
          </PrivacyConsentWrapper>
        </CustomInputGroup>

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

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </Container>
  );
};

export default UserDetailView;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  max-width: 60rem;
  margin: 60px auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
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

const CustomInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const CustomLabel = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  appearance: none;
  border: 0.125rem solid #d1d8e0;
  border-radius: 0.25rem;
  background-color: #ffffff;
  position: relative;
  cursor: inherit;

  &:checked {
    background-color: #3d72b3;
    border-color: #3d72b3;
  }

  &:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: bold;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const PrivacyConsentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  background-color: #ffffff;
  cursor: ${({ isEditable }) => (isEditable ? 'pointer' : 'default')};
  transition: all 0.2s;
`;

const ConsentText = styled.span`
  font-size: 1.125rem;
  color: ${({ checked }) => (checked ? '#2e2e32' : '#888')};
  font-weight: ${({ checked }) => (checked ? '500' : '400')};
`;
