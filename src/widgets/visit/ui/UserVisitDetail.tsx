import { useState } from 'react';
import styled from '@emotion/styled';
import { VisitDetailInput } from '@shared/ui/input/VisitDetailInput';
import { PasswordButton } from '@shared/ui/Button/index';
import { useFetchUserVisitDetail } from '@entities/visit/index';
import { UserVisitForm } from '@features/visit/update-visit-list/ui/UserVisitForm';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';

const AGE_MAP = {
  BABY: '0~8세',
  AGE_9_13: '9~13세',
  AGE_14_16: '14~16세',
  AGE_17_19: '17~19세',
  AGE_20_24: '20~24세',
  ADULT: '성인',
};

interface UserVisitDetailProps {
  logId: string | undefined;
}

export const UserVisitDetail = ({ logId }: UserVisitDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const modal = useModal();
  const {
    data: visit,
    isPending: isLoading,
    isError,
    error,
  } = useFetchUserVisitDetail(logId);

  if (isLoading) return <CenterText>기록을 불러오는 중...</CenterText>;
  if (isError)
    return <CenterText color="red">오류 발생: {error.message}</CenterText>;
  if (!visit) return <CenterText>기록을 찾을 수 없습니다.</CenterText>;

  if (isEditing) {
    return (
      <>
        <UserVisitForm
          visit={visit}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
          modal={modal}
        />
        <Modal
          isOpen={modal.isOpen}
          config={modal.config}
          onClose={modal.closeModal}
        />
      </>
    );
  }

  return (
    <DetailWrapper>
      <InputRow>
        <VisitDetailInput
          label="대표자 이름"
          value={visit.name ?? ''}
          isEditable={false}
        />
        <VisitDetailInput
          label="연령"
          value={AGE_MAP[visit.age] || visit.age}
          isEditable={false}
        />
      </InputRow>
      <VisitDetailInput label="연락처" value={visit.phone} isEditable={false} />
      <VisitDetailInput
        label="방문 목적"
        value={visit.purpose}
        isEditable={false}
      />
      <VisitDetailInput
        label="방문 날짜"
        value={visit.visitDate}
        isEditable={false}
      />
      <InputRow>
        <VisitDetailInput
          label="방문 남성 수"
          value={visit.maleCount}
          isEditable={false}
        />
        <VisitDetailInput
          label="방문 여성 수"
          value={visit.femaleCount}
          isEditable={false}
        />
      </InputRow>
      <VisitDetailInput
        label="방문 시간"
        value={visit.visitTime || ''}
        isEditable={false}
      />

      <CustomInputGroup>
        <CustomLabel>개인 정보 수집 동의</CustomLabel>
        <PrivacyConsentWrapper>
          <Checkbox type="checkbox" checked={visit.privacyAgreed} readOnly />
          <ConsentText $checked={visit.privacyAgreed}>
            {visit.privacyAgreed ? '동의함' : '동의하지 않음'}
          </ConsentText>
        </PrivacyConsentWrapper>
      </CustomInputGroup>

      <ButtonWrapper>
        <PasswordButton content="수정" onClick={() => setIsEditing(true)} />
      </ButtonWrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
`;

const CenterText = styled.p`
  text-align: center;
  margin: 3rem 0;
  color: ${(props) => props.color || '#777'};
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

const ConsentText = styled.span<{ $checked: boolean }>`
  font-size: 1rem;
  color: #6e7680;
`;
