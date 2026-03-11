import { useState } from 'react';
import styled from '@emotion/styled';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { VisitDetailInput } from '@shared/ui/input/VisitDetailInput';
import { PasswordButton } from '@shared/ui/Button/index';
import { ToggleSelect } from '@shared/ui/LabeldInput/ToggleSelect';
import { CountVisitor } from '@shared/ui/LabeldInput/CountVisitor';
import { VisitDatePicker, VisitTimePicker } from '@shared/ui';
import { useUpdateAdminItem } from '../model/useUpdateVisitList';
import { usePurposeList } from '@entities/purpose/index';
import { useResidenceList } from '@entities/residence';
import { UserVisitDetailResponse } from '@entities/visit/index';
import { UseModalReturn } from '@shared/hooks/useModal';

const AGE_OPTIONS = [
  { value: 'BABY', label: '0~8세' },
  { value: 'AGE_9_13', label: '9~13세' },
  { value: 'AGE_14_16', label: '14~16세' },
  { value: 'AGE_17_19', label: '17~19세' },
  { value: 'AGE_20_24', label: '20~24세' },
  { value: 'ADULT', label: '성인' },
];

const AGE_DISPLAY_LABELS = AGE_OPTIONS.map((opt) => opt.label);

interface UserVisitFormProps {
  visit: UserVisitDetailResponse;
  onCancel: () => void;
  onSuccess: () => void;
  modal: UseModalReturn;
}

export const UserVisitForm = ({
  visit,
  onCancel,
  onSuccess,
  modal,
}: UserVisitFormProps) => {
  const [formData, setFormData] = useState({
    id: visit.id || 0,
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

  const updateMutation = useUpdateAdminItem();
  const { data: purposes = [], isPending: isPurposesLoading } =
    usePurposeList();
  const { data: residences = [], isPending: isResidenceLoading } =
    useResidenceList();

  const purposeOptions = Array.isArray(purposes)
    ? purposes.map((p) => p.purpose)
    : [];
  const residenceOptions = Array.isArray(residences)
    ? residences.map((r) => r.residence)
    : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === 'phone') {
      const formattedValue = value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

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

  const handleAgeChange = (ageLabel: string) => {
    const ageEnum =
      AGE_OPTIONS.find((opt) => opt.label === ageLabel)?.value || ageLabel;
    setFormData((prev) => ({ ...prev, age: ageEnum as any }));
  };

  const handleSave = () => {
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

    updateMutation.mutate(formData as any, {
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
                onSuccess();
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

  return (
    <FormWrapper>
      <InputRow>
        <VisitDetailInput
          label="대표자 이름"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isEditable={true}
        />
        <ToggleSelect
          label="연령"
          options={AGE_DISPLAY_LABELS}
          value={
            AGE_OPTIONS.find((opt) => opt.value === formData.age)?.label ||
            formData.age
          }
          onChange={handleAgeChange}
        />
      </InputRow>
      <VisitDetailInput
        label="연락처"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        isEditable={true}
        type="tel"
      />
      <ToggleSelect
        label="방문 목적"
        options={isPurposesLoading ? ['로딩 중...'] : purposeOptions}
        value={formData.purpose}
        onChange={(v) => setFormData((p) => ({ ...p, purpose: v }))}
      />
      <ToggleSelect
        label="거주지"
        options={isResidenceLoading ? ['로딩 중...'] : residenceOptions}
        value={formData.residence}
        onChange={(v) => setFormData((p) => ({ ...p, residence: v }))}
      />
      <VisitDatePicker
        value={formData.visitDate}
        onChange={(v) => setFormData((p) => ({ ...p, visitDate: v }))}
      />
      <CountVisiorWrapper>
        <CountVisitor
          label="방문 남성 수"
          value={formData.maleCount}
          onChange={(v) => setFormData((p) => ({ ...p, maleCount: Number(v) }))}
        />
        <CountVisitor
          label="방문 여성 수"
          value={formData.femaleCount}
          onChange={(v) =>
            setFormData((p) => ({ ...p, femaleCount: Number(v) }))
          }
        />
      </CountVisiorWrapper>
      <VisitTimePicker
        value={formData.visitTime}
        onChange={(v) => setFormData((p) => ({ ...p, visitTime: v }))}
      />

      <CustomInputGroup>
        <CustomLabel>개인 정보 수집 동의</CustomLabel>
        <PrivacyConsentWrapper isEditable={true}>
          <Checkbox
            type="checkbox"
            name="privacyAgreed"
            checked={formData.privacyAgreed}
            onChange={handleChange}
          />
          <ConsentText $checked={formData.privacyAgreed}>
            {formData.privacyAgreed ? '동의함' : '동의하지 않음'}
          </ConsentText>
        </PrivacyConsentWrapper>
      </CustomInputGroup>

      <ButtonWrapper>
        <PasswordButton
          content={updateMutation.isPending ? '저장 중...' : '저장'}
          onClick={handleSave}
          disable={updateMutation.isPending}
        />
        <PasswordButton
          content="취소"
          onClick={onCancel}
          disable={updateMutation.isPending}
        />
      </ButtonWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
const InputRow = styled.div`
  display: flex;
  gap: 1.25rem;
  & > * {
    flex: 1;
  }
`;
const CountVisiorWrapper = styled(InputRow)``;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;
const CustomInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const CustomLabel = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;
const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
`;
const PrivacyConsentWrapper = styled.label<{ isEditable: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  cursor: ${({ isEditable }) => (isEditable ? 'pointer' : 'default')};
`;
const ConsentText = styled.span<{ $checked: boolean }>`
  font-size: 1.125rem;
  color: ${({ $checked }) => ($checked ? '#2e2e32' : '#888')};
`;
