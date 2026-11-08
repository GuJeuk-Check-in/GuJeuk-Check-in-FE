import { useModal } from '@center/ui/modal';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import type { VisitFormData } from './visitForm';
import { validateVisitForm } from './validateVisitForm';

export const useVisitSubmission = (value: VisitFormData, action: '등록' | '수정') => {
  const modal = useModal();

  const handleSubmit = () => {
    const error = validateVisitForm(value);
    if (error) {
      openInputCheckNotice(modal, error);
      return;
    }
    openApiPendingNotice(modal, action);
  };

  return { ...modal, handleSubmit };
};
