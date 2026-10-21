import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { DetailInput, SelectOption, VisitDatePicker } from '@center/ui/form';
import { adminTokens } from '@center/tokens';
import { IoMdPerson } from 'react-icons/io';
import { IoCall, IoLocationSharp } from 'react-icons/io5';
import { MdOutlineAccessTime, MdOutlineCalendarMonth } from 'react-icons/md';
import type { UserVisitDetailRecord } from '@entities/log';
import { useState } from 'react';
import { PasswordButton } from '@center/ui/auth';
import { Modal, useModal } from '@center/ui/modal';

interface UserVisitDetailProps {
  readonly visit?: UserVisitDetailRecord;
  readonly purposeOptions?: readonly string[];
}

const createFormData = (visit?: UserVisitDetailRecord) => ({
  name: visit?.name ?? '',
  age: String(visit?.age ?? ''),
  gender: visit?.gender ?? '',
  phone: visit?.phone ?? '',
  usageMinutes: String(visit?.usageMinutes ?? ''),
  purposes: [...(visit?.purposes ?? [])],
  visitDate:
    visit?.visitDate
      .match(/\d+/g)
      ?.map((part, index) => (index === 0 ? part : part.padStart(2, '0')))
      .join('-') ?? '',
});

export const UserVisitDetail = ({
  visit,
  purposeOptions = [],
}: UserVisitDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => createFormData(visit));
  const modal = useModal();

  const handleSave = () => {
    modal.openModal({
      title: '수정 API 연결 전입니다.',
      subtitle: '입력한 내용은 아직 저장되지 않았습니다.',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setFormData(createFormData(visit));
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
      <Fields>
        <InputRow>
          <DetailInput
            label="이름"
            value={isEditing ? formData.name : visit?.name ?? '—'}
            icon={<IoMdPerson />}
            isEditable={isEditing}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <DetailInput
            label="연령"
            value={isEditing ? formData.age : visit ? `${visit.age}세` : '—'}
            icon={<MdOutlineCalendarMonth />}
            type="number"
            hideNumberSpinner
            isEditable={isEditing}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, age: e.target.value }))
            }
          />
        </InputRow>
        {isEditing ? (
          <SelectOption
            label="성별"
            value={formData.gender}
            options={['여자', '남자']}
            icon={<IoMdPerson />}
            onChange={(gender) => setFormData((prev) => ({ ...prev, gender }))}
          />
        ) : (
          <DetailInput
            label="성별"
            value={visit?.gender ?? '—'}
            icon={<IoMdPerson />}
          />
        )}
        <DetailInput
          label="연락처"
          value={isEditing ? formData.phone : visit?.phone ?? '—'}
          icon={<IoCall />}
          type="tel"
          isEditable={isEditing}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
        <DetailInput
          label="이용 시간"
          value={
            isEditing
              ? formData.usageMinutes
              : visit
              ? `${visit.usageMinutes}분`
              : '—'
          }
          icon={<MdOutlineAccessTime />}
          type="number"
          hideNumberSpinner
          isEditable={isEditing}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, usageMinutes: e.target.value }))
          }
        />
        {isEditing ? (
          <>
            <SelectOption
              label="이용대장"
              multiple
              value={formData.purposes}
              icon={<IoLocationSharp />}
              options={[
                ...new Set([...purposeOptions, ...(visit?.purposes ?? [])]),
              ]}
              onChange={(purposes) =>
                setFormData((prev) => ({ ...prev, purposes }))
              }
            />
            <VisitDatePicker
              value={formData.visitDate}
              onChange={(visitDate) =>
                setFormData((prev) => ({ ...prev, visitDate }))
              }
            />
          </>
        ) : (
          <>
            <DetailInput
              label="이용대장"
              value={visit?.purposes.join(' / ') || '—'}
              icon={<IoLocationSharp />}
            />
            <DetailInput
              label="방문 날짜"
              value={visit?.visitDate ?? '—'}
              icon={<MdOutlineCalendarMonth />}
            />
          </>
        )}
        {visit && (
          <ButtonWrapper>
            {isEditing ? (
              <>
                <ActionButton content="저장" onClick={handleSave} />
                <ActionButton content="취소" onClick={handleCancel} />
              </>
            ) : (
              <ActionButton content="수정" onClick={handleEdit} />
            )}
          </ButtonWrapper>
        )}
      </Fields>
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;

const ActionButton = styled(PasswordButton)`
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  box-shadow: none;

  &:hover {
    background-color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 40rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
