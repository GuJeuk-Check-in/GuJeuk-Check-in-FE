import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { ColorData } from "@center/tokens";
import { Modal } from "@shared/ui/modal";
import { Calendar, HomeImage } from "@shared/assets";
import {
  getNextTime,
  type ReservationPeople,
  type ReservationPlace,
  type ReservationTime,
} from "./ReservationData";

const PHONE_PATTERN = /^010-\d{4}-\d{4}$/;

export interface ReservationCreateValues {
  userName: string;
  phone: string;
  people: ReservationPeople;
}

interface ReservationCreateModalProps {
  place: ReservationPlace;
  time: ReservationTime;
  onClose: () => void;
  onSubmit: (values: ReservationCreateValues) => void;
}

export const ReservationCreateModal = ({
  place,
  time,
  onClose,
  onSubmit,
}: ReservationCreateModalProps) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName.trim() || !PHONE_PATTERN.test(phone.trim())) return;
    onSubmit({
      userName: userName.trim(),
      phone: phone.trim(),
      people: { male: 0, female: 0 },
    });
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="large"
      showCloseButton
      config={{
        title: "예약 추가",
        subtitle: "예약자 정보를 입력하면 바로 예약돼요.",
      }}
    >
      <TargetInfo>
        <InfoRow>
          <img src={HomeImage} alt="" />
          <strong>시설</strong>
          <b>{place}</b>
        </InfoRow>
        <InfoRow>
          <img src={Calendar} alt="" />
          <strong>시간</strong>
          <b>
            오늘 · {getTodayLabel()} {time} - {getNextTime(time)}
          </b>
        </InfoRow>
      </TargetInfo>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="reservation-user-name">이름</Label>
          <Input
            id="reservation-user-name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="예약자 이름"
            required
          />
        </Field>
        <Field>
          <Label htmlFor="reservation-phone">전화번호</Label>
          <Input
            id="reservation-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="010-0000-0000"
            inputMode="tel"
            required
          />
        </Field>
        <Notice>ⓘ 예약은 1인 1시간만 가능해요.</Notice>
        <ActionRow>
          <ActionButton type="button" $variant="secondary" onClick={onClose}>
            취소
          </ActionButton>
          <ActionButton
            type="submit"
            $variant="primary"
            disabled={!userName.trim() || !PHONE_PATTERN.test(phone.trim())}
          >
            예약하기
          </ActionButton>
        </ActionRow>
      </Form>
    </Modal>
  );
};

const getTodayLabel = () =>
  new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

const TargetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[8]};
  margin: ${ColorData.spacing[16]} 0;
  padding: ${ColorData.spacing[12]};
  border-radius: ${ColorData.radius.medium};
  background-color: ${ColorData.colors.fillNormal};
  color: ${ColorData.colors.labelNeutral};
  font-size: ${ColorData.typography.caption.fontSize};
  text-align: left;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1rem 2.25rem 1fr;
  align-items: center;
  gap: ${ColorData.spacing[8]};
  color: ${ColorData.colors.labelAlternative};

  b {
    color: ${ColorData.colors.labelNormal};
    font-weight: 600;
  }

  img {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[16]};
  text-align: left;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ColorData.spacing[8]};
`;

const Label = styled.label`
  color: ${ColorData.colors.labelNeutral};
  font-size: ${ColorData.typography.label.fontSize};
  font-weight: 600;
`;

const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${ColorData.spacing[8]};
  margin-top: ${ColorData.spacing[8]};
`;

const Notice = styled.p`
  display: flex;
  align-items: center;
  gap: ${ColorData.spacing[4]};
  margin: -${ColorData.spacing[8]} 0 0;
  color: ${ColorData.colors.labelAlternative};
  font-size: ${ColorData.typography.caption.fontSize};
`;

const Input = styled.input`
  width: 100%;
  min-height: 2.75rem;
  padding: 0 ${ColorData.spacing[12]};
  box-sizing: border-box;
  border: 1px solid ${ColorData.colors.lineNormal};
  border-radius: ${ColorData.radius.medium};
  background-color: ${ColorData.colors.background};
  color: ${ColorData.colors.labelNormal};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${ColorData.typography.body.fontSize};
  outline: none;
  transition: border-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  &::placeholder {
    color: ${ColorData.colors.labelAssistive};
  }

  &:focus {
    border-color: ${ColorData.colors.primary};
    box-shadow: ${ColorData.shadow.focus};
  }
`;

const ActionButton = styled.button<{ $variant: "primary" | "secondary" }>`
  min-height: 2.75rem;
  padding: 0 ${ColorData.spacing[16]};
  border: 1px solid transparent;
  border-radius: ${ColorData.radius.large};
  background-color: ${({ $variant }) =>
    $variant === "primary"
      ? ColorData.colors.primary
      : ColorData.colors.background};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? ColorData.colors.background
      : ColorData.colors.labelNormal};
  font-family: ${ColorData.typography.fontFamily};
  font-size: ${ColorData.typography.body.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color ${ColorData.interaction.transitionFast},
    border-color ${ColorData.interaction.transitionFast},
    box-shadow ${ColorData.interaction.transitionFast};

  ${({ $variant }) =>
    $variant === "primary"
      ? `
        &:hover:not(:disabled) {
          background-color: ${ColorData.colors.primaryStrong};
        }
      `
      : `
        border-color: ${ColorData.colors.lineNormal};

        &:hover:not(:disabled) {
          background-color: ${ColorData.colors.fillNormal};
        }
      `}

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: ${ColorData.colors.interactionDisabled};
    border-color: transparent;
    color: ${ColorData.colors.labelDisabled};
    cursor: not-allowed;
  }
`;
