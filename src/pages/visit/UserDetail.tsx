import styled from '@emotion/styled';
import { Header } from '@widgets/GlobalLayout/index';
import VisitForm from '@widgets/visit/ui/VisitForm';
import { UseBackground } from '@shared/ui/Background/index';
import { Modal } from '@shared/ui';
import { useCreateUserVisit } from '@features/visit';

const UserDetail = () => {
  const {
    mutateAsync,
    isPending: isLoading,
    modal,
  } = useCreateUserVisit();

  return (
    <Container>
      <UseBackground />
      <Header />

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
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 60px 0;
`;
