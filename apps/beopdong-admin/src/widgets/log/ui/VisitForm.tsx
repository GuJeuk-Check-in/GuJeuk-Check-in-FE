import { useState } from 'react';
import { Modal } from '@center/ui/modal';
import { ActionButton, ActionButtons } from '@shared/ui';
import { createVisitFormData } from '../model/visitForm';
import { useVisitSubmission } from '../model/useVisitSubmission';
import { VisitFormFields } from './VisitFormFields';

interface VisitFormProps {
  readonly purposeOptions: readonly string[];
}

export const VisitForm = ({ purposeOptions }: VisitFormProps) => {
  const [formData, setFormData] = useState(() => createVisitFormData());
  const modal = useVisitSubmission(formData, '등록');

  return (
    <>
      <VisitFormFields
        value={formData}
        onChange={setFormData}
        purposeOptions={purposeOptions}
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
    </>
  );
};
