import styled from '@emotion/styled';
import VisitForm from '@widgets/visit/ui/VisitForm';
import { Modal } from '@shared/ui';
import { useCreateUserVisit } from '@features/visit';

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
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 60px 0;
`;
