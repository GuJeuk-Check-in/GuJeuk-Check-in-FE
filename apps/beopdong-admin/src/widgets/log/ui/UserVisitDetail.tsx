import styled from '@emotion/styled';
import { DetailInput } from '@center/ui/form';
import { adminTokens } from '@center/tokens';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';
import { MdDescription, MdOutlineAccessTime } from 'react-icons/md';
import type { UserVisitDetailRecord } from '@entities/log';
import { formatDateKoreanPadded } from '@shared/lib/formatDate';
import { useState } from 'react';
import { Modal } from '@center/ui/modal';
import { ActionButton, ActionButtons, BackLink } from '@shared/ui';
import { createVisitFormData } from '../model/visitForm';
import { useVisitSubmission } from '../model/useVisitSubmission';
import { VisitFormFields } from './VisitFormFields';

interface UserVisitDetailProps {
  readonly visit?: UserVisitDetailRecord;
  readonly purposeOptions?: readonly string[];
}

export const UserVisitDetail = ({
  visit,
  purposeOptions = [],
}: UserVisitDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => createVisitFormData(visit));
  const modal = useVisitSubmission(formData, '수정');

  const handleEdit = () => {
    setFormData(createVisitFormData(visit));
    setIsEditing(true);
  };

  return (
    <DetailWrapper>
      <BackLink to="/log" label="방명록 목록으로" />
      {!visit && (
        <StatusText role="status">
          방명록 API 연결 전입니다. 연결 후 상세 정보가 표시됩니다.
        </StatusText>
      )}
      {isEditing ? (
        <VisitFormFields
          value={formData}
          onChange={setFormData}
          purposeOptions={[...new Set([...purposeOptions, ...(visit?.purposes ?? [])])]}
        >
          <ActionButtons>
            <ActionButton content="저장" onClick={modal.handleSubmit} />
          </ActionButtons>
        </VisitFormFields>
      ) : (
        <Fields>
          <InputRow>
            <DetailInput label="이름" value={visit?.name ?? '—'} icon={<IoMdPerson />} />
            <DetailInput label="연령" value={visit ? `${visit.age}세` : '—'} icon={<CalendarIcon />} />
          </InputRow>
          <DetailInput label="성별" value={visit?.gender ?? '—'} icon={<IoMdPerson />} />
          <DetailInput label="연락처" value={visit?.phone ?? '—'} icon={<PhoneIcon />} />
          <DetailInput label="방문 시각" value={visit?.visitTime ?? '—'} icon={<MdOutlineAccessTime />} />
          <DetailInput label="이용대장" value={visit?.purposes.join(' / ') || '—'} icon={<IoLocationSharp />} />
          <DetailInput label="방문날짜" value={visit?.visitDate ? formatDateKoreanPadded(visit.visitDate) : '—'} icon={<CalendarIcon />} />
          <DetailInput label="비고사항" value={visit?.note || '—'} icon={<MdDescription />} />
          {visit && (
            <ActionButtons>
              <ActionButton content="수정" onClick={handleEdit} />
            </ActionButtons>
          )}
        </Fields>
      )}
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
  gap: 2rem;
  min-width: 0;
`;

const StatusText = styled.p`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 1rem;
  line-height: 1.6;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 40rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
