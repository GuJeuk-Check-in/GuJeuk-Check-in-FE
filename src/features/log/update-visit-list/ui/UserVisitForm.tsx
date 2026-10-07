/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 관리자가 특정 방문자의 정보(이름, 연락처, 연령대, 방문 목적, 인원수, 일시 등)를 입력 폼을 통해 수정하고, 서버에 저장할 수 있도록 지원하는 데이터 수정 폼 컴포넌트이다.
*/

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
} from '@entities/log';
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
  //기능: 서버에서 받아온 기존 방문자 데이터(visit)를 화면의 입력 폼과 동기화하기 위해 초기값으로 설정하고 상태(formData)로 관리한다.
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
  //기능: 사용자가 화면에서 만약 성인을 선택하면, 서버가 이해할 수 있는  ADULT로 매핑하여 age 상태에 반영한다.

  const handleAgeChange = (ageLabel: string) => {
    const age = getAgeTypeByLabel(ageLabel);
    if (!age) return;

    setFormData((prev) => ({ ...prev, age }));
  };
  //기능: 저장 버튼을 눌렀을 때 이름, 연락처, 목적, 방문일 등의 필수값을 검증하고, 이상이 없으면 서버에 수정을 요청한 뒤 결과(성공/실패)에 따라 알맞은 알림 모달을 출력한다.

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
