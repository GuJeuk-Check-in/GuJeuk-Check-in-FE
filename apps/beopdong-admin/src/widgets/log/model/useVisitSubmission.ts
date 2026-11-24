import { useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { useModal } from '@center/ui/modal';
import { getApiErrorMessage } from '@entities/auth';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import type { VisitFormData, VisitFormVariant } from './visitForm';
import { validateVisitForm } from './validateVisitForm';

const FAILURE_MESSAGE = '요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.';

export const useVisitSubmission = (
  value: VisitFormData,
  action: '등록' | '수정',
  variant: VisitFormVariant = 'minor',
  onSubmit?: (value: VisitFormData) => Promise<void>,
  onDone?: () => void,
) => {
  const modal = useModal();
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  const handleSubmit = async () => {
    const error = validateVisitForm(value, variant);
    if (error) {
      setShowInvalid(true);
      openInputCheckNotice(modal, error);
      return;
    }
    if (!onSubmit) {
      openApiPendingNotice(modal, action);
      return;
    }
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      await onSubmit(value);
      onDone?.();
    } catch (submitError) {
      modal.openModal({
        title: `${action}에 실패했습니다.`,
        subtitle:
          !isAxiosError(submitError) && submitError instanceof Error
            ? submitError.message
            : getApiErrorMessage(submitError, FAILURE_MESSAGE),
        buttons: [{ label: '확인', onClick: modal.closeModal }],
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return { ...modal, handleSubmit, isSubmitting, showInvalid };
};
