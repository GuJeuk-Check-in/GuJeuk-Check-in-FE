import styled from '@emotion/styled';
import type { ChangeEventHandler } from 'react';

type PrivacyAgreementSectionProps = {
  readonly checked: boolean;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
};

export const PrivacyAgreementSection = ({
  checked,
  onChange,
}: PrivacyAgreementSectionProps) => (
  <Agreement>
    <AgreementTitle>
      개인정보 수집 및 이용 동의
      <AgreementCheckbox
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label="개인정보 수집 및 이용 동의"
      />
    </AgreementTitle>
    <AgreementDetail>
      (이름, 성별, 생년월일, 연락처, 거주지,{' '}
      <AgreementTerm>방문 목적</AgreementTerm>, 방문 인원, CCTV 촬영)
    </AgreementDetail>
  </Agreement>
);

const Agreement = styled.div`
  text-align: center;
`;

const AgreementTitle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #222831;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
`;

const AgreementCheckbox = styled.input`
  width: 1.05rem;
  height: 1.05rem;
  appearance: none;
  border: 0.1rem solid #c8d5e6;
  border-radius: 0.15rem;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;

  &:checked {
    border-color: #37c4f4;
    background-color: #37c4f4;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    inset: 0;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 800;
    line-height: 1.05rem;
    text-align: center;
  }

  &:focus-visible {
    outline: 0.2rem solid rgba(55, 196, 244, 0.28);
    outline-offset: 0.15rem;
  }
`;

const AgreementDetail = styled.p`
  margin: 0.65rem 0 0;
  color: #7f8793;
  font-size: 0.9rem;
  word-break: keep-all;
`;

const AgreementTerm = styled.span`
  white-space: nowrap;
`;
