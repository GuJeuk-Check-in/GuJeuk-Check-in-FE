import { useModal } from '@center/ui/modal';
import type { VisitFormData } from './visitForm';
import { validateVisitForm } from './validateVisitForm';

export const useVisitSubmission = (value: VisitFormData, action: '등록' | '수정') => {
  const modal = useModal();

  const handleSubmit = () => {
    const error = validateVisitForm(value);
    modal.openModal({
      title: error ? '입력 확인' : `${action} API 연결 전입니다.`,
      subtitle: error ?? '입력한 내용은 아직 저장되지 않았습니다.',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  return { ...modal, handleSubmit };
};
