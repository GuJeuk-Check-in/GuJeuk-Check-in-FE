/*
  코드 주석 작성일: 2026/10/6
  작성자: 박민건
  이 파일의 전체적인 기능: 방문 기록의 상세 정보를 조회해 표시하고, 수정 버튼을 누르면 수정 폼으로 전환한다.
*/

import { useState } from 'react';
import styled from '@emotion/styled';
import { VisitDetailInput } from '@shared/ui/input/VisitDetailInput';
import { PasswordButton } from '@shared/ui/Button/index';
import {
  getAgeLabel,
  useFetchUserVisitDetail,
  VisitPrivacyAgreementField,
} from '@entities/log';
import { UserVisitForm } from '@features/log/update-visit-list/ui/UserVisitForm';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';

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
  //기능: 수정 모드에서는 수정 폼을 표시하고, 취소하거나 수정에 성공하면 상세 화면으로 돌아간다.

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

  //기능: 대표자 정보, 방문 목적, 날짜, 인원과 시간을 읽기 전용으로 표시한다.
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
          value={getAgeLabel(visit.age)}
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

      <VisitPrivacyAgreementField checked={visit.privacyAgreed} readOnly />

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
//기능: 상세 항목의 간격과 가로 배치 설정 수정 버튼과 안내 문구를 가운데 정렬한다.

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
