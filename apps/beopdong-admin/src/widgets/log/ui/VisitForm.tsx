import { useState } from 'react';
import { Modal } from '@center/ui/modal';
import { createVisitFormData } from '../model/visitForm';
import { useVisitSubmission } from '../model/useVisitSubmission';
import { VisitFormActions, VisitFormButton, VisitFormFields } from './VisitFormFields';

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
        <VisitFormActions>
          <VisitFormButton content="추가" onClick={modal.handleSubmit} />
        </VisitFormActions>
      </VisitFormFields>
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};
