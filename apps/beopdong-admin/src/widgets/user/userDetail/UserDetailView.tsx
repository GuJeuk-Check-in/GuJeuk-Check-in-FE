import { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, useModal } from '@center/ui/modal';
import { ActionButton, CancelButton, EditButton } from '@shared/ui';
import { getApiErrorMessage } from '@entities/auth';
import { MAX_GRADE_BY_SCHOOL_TYPE, UserDetailFields, type UpdateUserRequest, type UserDetail } from '@entities/user';
import { useUpdateUser } from '@features/user/update-user';
import { SchoolSearchModal } from '@features/school/search-school';
import { useUnsavedChanges } from '@shared/lib/useUnsavedChanges';
import { ConfirmModal } from '@shared/ui/ConfirmModal';

interface UserDetailViewProps {
  readonly userId: string;
  readonly user: UserDetail;
}

export const UserDetailView = ({ userId, user }: UserDetailViewProps) => {
  const [draft, setDraft] = useState<UpdateUserRequest | null>(null);
  const initialDraft: UpdateUserRequest = { ...user, schoolType: null };
  const { mutate: saveUser, isPending: isSaving } = useUpdateUser(userId);
  const modal = useModal();
  const [isSchoolSearchOpen, setSchoolSearchOpen] = useState(false);
  const { isDirty, guard } = useUnsavedChanges({
    value: draft ?? initialDraft,
    initial: initialDraft,
    enabled: draft !== null,
  });

  const needsGradeChange = !!draft?.schoolType && draft.grade > MAX_GRADE_BY_SCHOOL_TYPE[draft.schoolType];

  const handleSave = () => {
    if (!draft || isSaving || needsGradeChange) return;
    saveUser(draft, {
      onSuccess: () => setDraft(null),
      onError: (error) => {
        modal.openModal({
          title: '수정 실패',
          subtitle: getApiErrorMessage(error, '회원 정보를 수정하지 못했습니다.'),
          buttons: [{ label: '확인', onClick: modal.closeModal }],
        });
      },
    });
  };

  return (
    <>
      <Content>
        <FormFields disabled={isSaving}>
          <UserDetailFields
            user={draft ?? initialDraft}
            visitCount={user.visitCount}
            isEditing={draft !== null}
            onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
            onSchoolClick={() => setSchoolSearchOpen(true)}
          />
        </FormFields>
        {needsGradeChange && <GradeNotice role="status">학교 유형에 맞는 학년을 다시 선택해주세요.</GradeNotice>}
        <Actions>
          {draft ? (
            <>
              <CancelButton content="취소" onClick={() => setDraft(null)} disable={isSaving} />
              <ActionButton
                content={isSaving ? '저장 중' : '저장'}
                onClick={handleSave}
                disable={!isDirty || isSaving || needsGradeChange}
              />
            </>
          ) : (
            <EditButton content="수정" onClick={() => setDraft(initialDraft)} />
          )}
        </Actions>
      </Content>
      {draft && isSchoolSearchOpen && (
        <SchoolSearchModal
          selectedName={draft.school}
          onSelect={({ schoolName, schoolType }) => {
            setDraft((previous) => previous && {
              ...previous,
              school: schoolName,
              schoolType: schoolType === 'OTHER' ? null : schoolType,
            });
            setSchoolSearchOpen(false);
          }}
          onClose={() => setSchoolSearchOpen(false)}
        />
      )}
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <ConfirmModal isOpen={guard.isOpen} config={guard.config} onClose={guard.onClose} />
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormFields = styled.fieldset`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

const GradeNotice = styled.p`
  margin: 0;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;

    > button {
      flex: 1;
      min-width: 0;
    }
  }
`;
