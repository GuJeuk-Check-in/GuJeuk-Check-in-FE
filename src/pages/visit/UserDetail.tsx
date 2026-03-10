import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Header } from '@widgets/GlobalLayout/index';
import VisitForm from '@widgets/visit/ui/VisitForm';
import { UseBackground } from '@shared/ui/Background/index';
import { Modal } from '@shared/ui';
import { useCreateUserVisit } from '@features/visit/index';

const UserDetail = () => {
  const navigate = useNavigate();
  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    modal,
  } = useCreateUserVisit({
    onSuccessCallback: () => {
      navigate('/log');
    },
  });

  const handleSubmit = async (dataToSend: any) => {
    await mutate(dataToSend);
  };

  return (
    <Container>
      <UseBackground />
      <Header />

      <ContentWrapper>
        <VisitForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isError={isError}
          error={error}
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
