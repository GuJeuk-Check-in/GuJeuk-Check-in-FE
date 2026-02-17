import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background';
import { Header } from '@widgets/GlobalLayout/index';
import { PurposeBoard } from '@widgets/purpose/ui/PurposeBoard';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '@shared/ui/modal/Modal';

export const ResidenceCustom = () => {
  const { isOpen, config, openModal, closeModal } = useModal();

  return (
    <Container>
      <UseBackground />
      <Header />
      <PurposeBoard openModal={openModal} closeModal={closeModal} />
      <Modal isOpen={isOpen} config={config} onClose={closeModal} />
    </Container>
  );
};

const Container = styled.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 3.75rem;
  gap: 1.25rem;
  box-sizing: border-box;
`;
