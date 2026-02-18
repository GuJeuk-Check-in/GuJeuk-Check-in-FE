import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background';
import { Header } from '@widgets/GlobalLayout/index';
import { ResidenceBoard } from '@widgets/residence/ui/ResidenceBoard';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '@shared/ui/modal/Modal';

export const ResidenceCustom = () => {
  const { isOpen, config, openModal, closeModal } = useModal();

  return (
    <Container>
      <UseBackground />
      <Header />
      <ResidenceBoard openModal={openModal} closeModal={closeModal} />
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
