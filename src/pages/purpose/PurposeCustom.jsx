import styled from '@emotion/styled';
import { UseBackground } from '@shared/ui/Background/index';
import { Header } from '@widgets/GlobalLayout/index';
import { Modal } from '../../shared/ui/modal/Modal';
import { useModal } from '@shared/hooks/useModal';
import { PurposeBoard } from '@widgets/purpose/ui/PurposeBoard';

const PurposeCustom = () => {
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

export default PurposeCustom;

const Container = styled.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  padding: 3.5rem 0;
  box-sizing: border-box;
`;
