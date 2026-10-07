import { Modal } from '@shared/ui';
import {
  CheckInLoginPageLayout,
  LoginSubmitButton,
  ParticipantCountersSection,
  PurposeSelectionSection,
} from './CheckInLoginFormSections';
import { useCheckInLoginFormFlow } from './useCheckInLoginFormFlow';

const CheckInLoginFormPage = () => {
  const flow = useCheckInLoginFormFlow();

  return (
    <>
      <CheckInLoginPageLayout onBack={flow.navigateBack}>
        <PurposeSelectionSection
          options={flow.purposeOptions}
          selectedIndex={flow.purposeIndex}
          isLoading={flow.isPurposeLoading}
          isError={flow.isPurposeError}
          onSelect={flow.selectPurpose}
        />
        <ParticipantCountersSection
          maleCount={flow.maleCount}
          femaleCount={flow.femaleCount}
          onDecreaseMale={flow.decreaseMaleCount}
          onIncreaseMale={flow.increaseMaleCount}
          onDecreaseFemale={flow.decreaseFemaleCount}
          onIncreaseFemale={flow.increaseFemaleCount}
        />
        <LoginSubmitButton isSaving={flow.isSaving} onClick={flow.submit} />
      </CheckInLoginPageLayout>
      <Modal
        isOpen={flow.modal.isOpen}
        config={flow.modal.config}
        onClose={flow.modal.closeModal}
      />
    </>
  );
};

export default CheckInLoginFormPage;
