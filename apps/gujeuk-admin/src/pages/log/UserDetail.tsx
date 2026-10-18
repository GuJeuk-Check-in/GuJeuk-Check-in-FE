import styled from '@emotion/styled';
import VisitForm from '@widgets/log/ui/VisitForm';
import { Modal } from '@shared/ui';
import { useCreateUserVisit } from '@features/log';

const UserDetail = () => {
  const {
    mutateAsync,
    isPending: isLoading,
    modal,
  } = useCreateUserVisit();

  return (
    <>
      <ContentWrapper>
        <VisitForm
          onSubmit={mutateAsync}
          isLoading={isLoading}
        />
      </ContentWrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

export default UserDetail;

const ContentWrapper = styled.div`
  flex: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 3.75rem 0;
`;
