import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { DetailInput } from '@center/ui/form';
import { adminTokens } from '@center/tokens';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';
import { MdOutlineAccessTime } from 'react-icons/md';
import type { UserVisitDetailRecord } from '@entities/log';
import { formatDateKoreanPadded } from '@shared/lib/formatDate';
import { useState } from 'react';
import { Modal } from '@center/ui/modal';
import { createVisitFormData } from '../model/visitForm';
import { useVisitSubmission } from '../model/useVisitSubmission';
import { VisitFormActions, VisitFormButton, VisitFormFields } from './VisitFormFields';

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

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setFormData(createVisitFormData(visit));
    setIsEditing(true);
  };

  return (
    <DetailWrapper>
      <BackLink to="/log">‹ 방명록 목록으로</BackLink>
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
          <VisitFormActions>
            <VisitFormButton content="저장" onClick={modal.handleSubmit} />
            <VisitFormButton content="취소" onClick={handleCancel} />
          </VisitFormActions>
        </VisitFormFields>
      ) : (
        <Fields>
          <InputRow>
            <DetailInput label="이름" value={visit?.name ?? '—'} icon={<IoMdPerson />} />
            <DetailInput label="연령" value={visit ? `${visit.age}세` : '—'} icon={<CalendarIcon />} />
          </InputRow>
          <DetailInput label="성별" value={visit?.gender ?? '—'} icon={<IoMdPerson />} />
          <DetailInput label="연락처" value={visit?.phone ?? '—'} icon={<PhoneIcon />} />
          <DetailInput label="이용대장" value={visit?.purposes.join(' / ') || '—'} icon={<IoLocationSharp />} />
          <DetailInput label="방문 날짜" value={visit?.visitDate ? formatDateKoreanPadded(visit.visitDate) : '—'} icon={<CalendarIcon />} />
          <DetailInput label="방문 시간" value={visit?.visitTime ?? '—'} icon={<MdOutlineAccessTime />} />
          {visit && (
            <VisitFormActions>
              <VisitFormButton content="수정" onClick={handleEdit} />
            </VisitFormActions>
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

const BackLink = styled(Link)`
  align-self: flex-start;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 1.25rem;
  line-height: 1.6;
  text-underline-offset: 0.2em;
  text-decoration: none;

  &:focus-visible {
    outline: 0.125rem solid
      ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 0.25rem;
  }
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
