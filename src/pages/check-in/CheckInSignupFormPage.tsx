import styled from '@emotion/styled';
import { PasswordBackground } from '@shared/ui/Background';
import { Modal } from '@shared/ui';
import { createPortal } from 'react-dom';
import { FiArrowLeft, FiPhone, FiUser } from 'react-icons/fi';
import {
  BirthDateInputsSection,
  GenderSelectionSection,
  ParticipantCountersSection,
  PrivacyAgreementSection,
  PurposeSelectionSection,
  ResidenceSelectionModal,
  ResidenceSelectorSection,
  SignupSubmitButton,
  TextFieldSection,
} from './CheckInSignupFormSections';
import { useCheckInSignupFormFlow } from './useCheckInSignupFormFlow';

const CheckInSignupFormPage = () => {
  const flow = useCheckInSignupFormFlow();

  return (
    <Page>
      <PasswordBackground />
      <Panel>
        <Header>
          <TitleRow>
            <BackButton
              type="button"
              onClick={flow.navigateBack}
              aria-label="뒤로 가기"
            >
              <FiArrowLeft />
            </BackButton>
            <Title>
              <Highlight>구즉</Highlight> 청소년 문화의 <NoWrap>집에</NoWrap>{' '}
              온 걸 환영해~!
            </Title>
          </TitleRow>
          <Subtitle>시설을 이용하려면 작성해줘</Subtitle>
        </Header>

        <FormBody aria-label="시설 이용 정보 입력">
          <PurposeSelectionSection
            options={flow.purposeOptions}
            selectedIndex={flow.purposeIndex}
            isLoading={flow.isPurposeLoading}
            isError={flow.isPurposeError}
            onSelect={flow.selectPurpose}
          />
          <TextFieldSection
            icon={<FiUser aria-hidden="true" />}
            label="이름이 뭐야?"
            value={flow.name}
            onChange={flow.setNameFromInput}
            placeholder="친구의 이름을 알려줘"
          />
          <TextFieldSection
            icon={<FiPhone aria-hidden="true" />}
            label="전화번호가 뭐야?"
            value={flow.phone}
            onChange={flow.setPhoneFromInput}
            placeholder="010-0000-0000"
          />
          <GenderSelectionSection value={flow.gender} onSelect={flow.setGender} />
          <BirthDateInputsSection
            birthYear={flow.birthYear}
            birthMonth={flow.birthMonth}
            birthDay={flow.birthDay}
            onBirthYearChange={flow.setBirthYearFromInput}
            onBirthMonthChange={flow.setBirthMonthFromInput}
            onBirthDayChange={flow.setBirthDayFromInput}
          />
          <ResidenceSelectorSection
            residence={flow.residence}
            onOpen={flow.openResidenceModal}
          />
          <ParticipantCountersSection
            maleCount={flow.maleCount}
            femaleCount={flow.femaleCount}
            onDecreaseMale={flow.decreaseMaleCount}
            onIncreaseMale={flow.increaseMaleCount}
            onDecreaseFemale={flow.decreaseFemaleCount}
            onIncreaseFemale={flow.increaseFemaleCount}
          />
          <PrivacyAgreementSection
            checked={flow.privacyAgreed}
            onChange={flow.setPrivacyAgreedFromInput}
          />
          <SignupSubmitButton isSaving={flow.isSaving} onClick={flow.submit} />
        </FormBody>
      </Panel>
      <Modal
        isOpen={flow.modal.isOpen}
        config={flow.modal.config}
        onClose={flow.modal.closeModal}
      />
      {flow.residenceModalOpen &&
        createPortal(
          <ResidenceSelectionModal
            residences={flow.filteredResidences}
            selectedResidence={flow.residence}
            search={flow.residenceSearch}
            isLoading={flow.isResidenceLoading}
            isError={flow.isResidenceError}
            onSearchChange={flow.setResidenceSearchFromInput}
            onSelect={flow.selectResidence}
            onClose={flow.closeResidenceModal}
          />,
          document.body
        )}
      <Footer>made by Busurker</Footer>
    </Page>
  );
};

export default CheckInSignupFormPage;

const Page = styled.main`
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 6.5rem 1.5rem 4rem;
`;

const Panel = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 64rem);
  margin: 0 auto;
  box-sizing: border-box;
  padding: clamp(2rem, 4vw, 4rem);
  border: 0.125rem solid #e7eaf3;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 1.5rem 2.75rem rgba(24, 48, 88, 0.15);
`;

const Header = styled.header`
  text-align: center;
`;

const TitleRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;

  @media (max-width: 560px) {
    align-items: flex-start;
    padding-top: 3rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 400;
  line-height: 1.2;
`;

const Highlight = styled.span`
  color: #f3b000;
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

const Subtitle = styled.p`
  margin: 0.75rem 0 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #2f66ad;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background: #f0f4fb;
  }

  @media (max-width: 560px) {
    top: 0;
    transform: none;
  }
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: 4rem;
  color: #1f63b7;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
`;
