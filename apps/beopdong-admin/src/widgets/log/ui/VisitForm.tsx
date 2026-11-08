import { useState } from 'react';
import { Modal } from '@center/ui/modal';
import { ActionButton, ActionButtons } from '@shared/ui';
import { createVisitFormData, type VisitFormVariant } from '../model/visitForm';
import { useVisitSubmission } from '../model/useVisitSubmission';
import { useUnsavedChanges } from '@shared/lib/useUnsavedChanges';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { VisitFormFields } from './VisitFormFields';

interface VisitFormProps {
  readonly purposeOptions: readonly string[];
  readonly variant?: VisitFormVariant;
}

export const VisitForm = ({ purposeOptions, variant = 'minor' }: VisitFormProps) => {
  const [formData, setFormData] = useState(() => createVisitFormData());
  const modal = useVisitSubmission(formData, '등록', variant);
  const { guard } = useUnsavedChanges({ value: formData, initial: createVisitFormData() });

  return (
    <>
      <VisitFormFields
        value={formData}
        onChange={setFormData}
        purposeOptions={purposeOptions}
        variant={variant}
      >
        <ActionButtons>
          <ActionButton content="추가" onClick={modal.handleSubmit} />
        </ActionButtons>
      </VisitFormFields>
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
      <ConfirmModal isOpen={guard.isOpen} config={guard.config} onClose={guard.onClose} />
    </>
  );
};
