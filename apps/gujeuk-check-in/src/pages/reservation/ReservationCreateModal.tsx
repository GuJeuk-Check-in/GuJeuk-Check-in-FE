import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "@shared/ui";
import { Modal } from "@shared/ui/modal";
import { ColorData } from "@shared/ui/design-system";
import type { ReservationPlace, ReservationTime } from "./ReservationData";
import { HomeImage, Calendar } from "@shared/assets/index";

const PHONE_PATTERN = /^010-\d{4}-\d{4}$/;

export interface ReservationCreateValues {
  userName: string;
  phone: string;
  people: string;
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
      people: "본인",
    });
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      config={{
        title: "예약 추가",
        subtitle: "예약자 정보를 입력하면 바로 예약돼요.",
      }}
    >
      <TargetInfo>
        <InfoRow>
          <img src={HomeImage} />
          <strong>시설</strong>
          <b>{place}</b>
        </InfoRow>
        <InfoRow>
          <img src={Calendar} />
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
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button
            type="submit"
            disabled={!userName.trim() || !PHONE_PATTERN.test(phone.trim())}
          >
            예약하기
          </Button>
        </ActionRow>
      </Form>
    </Modal>
  );
};

const getNextTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return `${String(hour + 1).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
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
    object-fit: contain;
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
