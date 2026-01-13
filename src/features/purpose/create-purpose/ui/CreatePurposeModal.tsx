import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '../../../../components/Modal/Modal';
import LabeledInput from '@shared/ui/Form/LabeledInput';
import PasswordButton from '@shared/ui/Button/PasswordButton';
import { useCreatePurpose } from '../model/useCreatePurpose';

interface CreatePurposeModalProps {
  onClose: () => void;
}

export const CreatePurposeModal = ({ onClose }: CreatePurposeModalProps) => {
  const [purpose, setPurpose] = useState('');
  const { isOpen, config, openModal, closeModal } = useModal();
  const { mutate: create, isPending } = useCreatePurpose();

  const handleConfirm = () => {
    const trimmedPurpose = purpose.trim();

    if (!trimmedPurpose) {
      openModal({
        icon: <FaExclamationTriangle color="#D88282" />,
        title: '입력 확인',
        subtitle: '방문 목적을 입력해주세요.',
        theme: 'warning',
        buttons: [{ label: '확인', variant: 'primary', onClick: closeModal }],
      });
      return;
    }

    create(
      { purpose: trimmedPurpose },
      {
        onSuccess: () => {
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '생성 성공',
            subtitle: `"${trimmedPurpose}" 목적이 추가되었습니다.`,
            theme: 'info',
            buttons: [
              {
                label: '확인',
                variant: 'secondary',
                onClick: () => {
                  closeModal();
                  onClose();
                },
              },
            ],
          });
        },
        onError: (error) => {
          const message = error.response?.data?.message || '생성 실패';
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '생성 실패',
            subtitle: message,
            theme: 'warning',
            buttons: [
              { label: '닫기', variant: 'secondary', onClick: closeModal },
            ],
          });
        },
      }
    );
  };

  return (
    <ModalContainer>
      <Title>방문 목적 추가</Title>
      <LabeledInput
        label="목적 명칭"
        placeholder="예: 회의, 방문, 면접 등"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
      />

      <ButtonWrapper>
        <PasswordButton
          content={isPending ? '처리 중...' : '등록하기'}
          onClick={handleConfirm}
        />
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ButtonWrapper>

      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
`;
