import styled from '@emotion/styled';
import UseBackground from '@shared/ui/Background/UseBackground';
import Header from '@widgets/layout/header/Header';
import { Modal } from '../components/Modal/Modal';
import { useModal } from '@shared/hooks/useModal';
import { PurposeBoard } from '@widgets/purpose/ui/PurposeBoard';

const PurposeCustom = () => {
  const { isOpen, config, openModal, closeModal } = useModal();

  return (
    <Container>
      <UseBackground />
      <Header title="방문 목적 커스텀" />
      <PurposeBoard openModal={openModal} closeModal={closeModal} />
      <Modal isOpen={isOpen} config={config} onClose={closeModal} />
    </Container>
  );
};

export default PurposeCustom;

const Container = styled.div`
  padding-top: 8.125rem;
  min-height: 100vh;
`;
