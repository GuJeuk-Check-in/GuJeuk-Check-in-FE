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
import {
  AGE_LABELS,
  getAgeLabel,
  getAgeTypeByLabel,
  type UserVisitDetailResponse,
  VisitPrivacyAgreementField,
} from '@entities/visit';
import { UseModalReturn } from '@shared/hooks/useModal';

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

  const purposeOptions = Array.isArray(purposes)
    ? purposes.map((p) => p.purpose)
    : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAgeChange = (ageLabel: string) => {
    const age = getAgeTypeByLabel(ageLabel);
    if (!age) return;

    setFormData((prev) => ({ ...prev, age }));
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

    updateMutation.mutate(formData, {
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
          options={AGE_LABELS}
          value={getAgeLabel(formData.age)}
          onChange={handleAgeChange}
        />
      </InputRow>
      <VisitDetailInput
        label="연락처"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        isEditable={true}
      />
      <ToggleSelect
        label="방문 목적"
        options={isPurposesLoading ? ['로딩 중...'] : purposeOptions}
        value={formData.purpose}
        onChange={(v) => setFormData((p) => ({ ...p, purpose: v }))}
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

      <VisitPrivacyAgreementField
        name="privacyAgreed"
        checked={formData.privacyAgreed}
        onChange={handleChange}
      />

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
