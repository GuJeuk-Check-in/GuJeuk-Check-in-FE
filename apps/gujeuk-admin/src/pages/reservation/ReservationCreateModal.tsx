import { useId, useState, type FormEvent, type ReactNode } from "react";
import styled from "@emotion/styled";
import {
  FiCalendar,
  FiHome,
  FiMinus,
  FiPhone,
  FiPlus,
  FiUser,
  FiX,
} from "react-icons/fi";
import { ColorData } from "@center/tokens";
import {
  formatTimeRange,
  getNextTime,
  type ReservationPeople,
  type ReservationPlace,
  type ReservationTime,
} from "./ReservationData";
import { ReservationDialog } from "./ReservationDialog";
import { ReservationColors } from "./reservationColors";

const PHONE_PATTERN = /^010-\d{4}-\d{4}$/;
const MAX_COMPANION_COUNT = 99;

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

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
  onEdit: () => void;
  isPending: boolean;
  errorMessage: string | null;
}

export const ReservationCreateModal = ({
  place,
  time,
  onClose,
  onSubmit,
  onEdit,
  isPending,
  errorMessage,
}: ReservationCreateModalProps) => {
  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const canSubmit =
    !isPending && Boolean(userName.trim()) && PHONE_PATTERN.test(phone.trim());

  const changeCount = (
    setCount: (updater: (count: number) => number) => void,
    delta: number,
  ) => {
    setCount((count) =>
      Math.min(MAX_COMPANION_COUNT, Math.max(0, count + delta)),
    );
    onEdit();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      userName: userName.trim(),
      phone: phone.trim(),
      people: { male, female },
    });
  };

  return (
    <ReservationDialog
      labelledBy={titleId}
      closable={!isPending}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit} onChange={onEdit}>
        <Header>
          <Title id={titleId}>예약 추가</Title>
          <CloseButton
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="예약 추가 닫기"
          >
            <FiX aria-hidden="true" />
          </CloseButton>
        </Header>

        <TargetInfo>
          <InfoRow>
            <FiHome aria-hidden="true" />
            <InfoLabel>시설</InfoLabel>
            <InfoValue>{place}</InfoValue>
          </InfoRow>
          <InfoRow>
            <FiCalendar aria-hidden="true" />
            <InfoLabel>시간</InfoLabel>
            <InfoValue>
              오늘 · {getTodayLabel()} {formatTimeRange(time, getNextTime(time))}
            </InfoValue>
          </InfoRow>
        </TargetInfo>

        <Fields>
          <Field>
            <Label htmlFor={nameId}>이름</Label>
            <InputBox icon={<FiUser aria-hidden="true" />}>
              <Input
                id={nameId}
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="예약자 이름"
                disabled={isPending}
                required
              />
            </InputBox>
          </Field>
          <Field>
            <Label htmlFor={phoneId}>전화번호</Label>
            <InputBox icon={<FiPhone aria-hidden="true" />}>
              <Input
                id={phoneId}
                value={phone}
                onChange={(event) =>
                  setPhone(formatPhoneNumber(event.target.value))
                }
                placeholder="010-0000-0000"
                inputMode="tel"
                maxLength={13}
                disabled={isPending}
                required
              />
            </InputBox>
          </Field>
          <Field as="fieldset">
            <Legend>동행인 수</Legend>
            <CounterRow>
              <Counter
                label="남자"
                value={male}
                disabled={isPending}
                onDecrease={() => changeCount(setMale, -1)}
                onIncrease={() => changeCount(setMale, 1)}
              />
              <Counter
                label="여자"
                value={female}
                disabled={isPending}
                onDecrease={() => changeCount(setFemale, -1)}
                onIncrease={() => changeCount(setFemale, 1)}
              />
            </CounterRow>
          </Field>
        </Fields>

        {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}

        <ActionRow>
          <ActionButton
            type="button"
            $variant="secondary"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </ActionButton>
          <ActionButton type="submit" $variant="primary" disabled={!canSubmit}>
            {isPending ? "예약 중..." : "예약하기"}
          </ActionButton>
        </ActionRow>
      </Form>
    </ReservationDialog>
  );
};

const InputBox = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => (
  <InputFrame>
    {icon}
    {children}
  </InputFrame>
);

interface CounterProps {
  label: string;
  value: number;
  disabled: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

const Counter = ({
  label,
  value,
  disabled,
  onDecrease,
  onIncrease,
}: CounterProps) => (
  <CounterField>
    <CounterLabel>{label}</CounterLabel>
    <CounterBox>
      <CounterButton
        type="button"
        onClick={onDecrease}
        disabled={disabled || value <= 0}
        aria-label={`${label} 동행인 줄이기`}
      >
        <FiMinus aria-hidden="true" />
      </CounterButton>
      <CounterValue aria-live="polite" aria-label={`${label} 동행인 ${value}명`}>
        {value}
      </CounterValue>
      <CounterButton
        type="button"
        onClick={onIncrease}
        disabled={disabled || value >= MAX_COMPANION_COUNT}
        aria-label={`${label} 동행인 늘리기`}
      >
        <FiPlus aria-hidden="true" />
      </CounterButton>
    </CounterBox>
  </CounterField>
);

const getTodayLabel = () =>
  new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  color: ${ReservationColors.gray40};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: none;
  color: ${ReservationColors.gray40};
  cursor: pointer;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover:not(:disabled) {
    background-color: ${ColorData.colors.fillNormal};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const TargetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1rem 1.125rem;
  border-radius: 0.75rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  svg {
    flex: 0 0 auto;
    width: 1.125rem;
    height: 1.125rem;
    color: ${ReservationColors.gray40};
  }
`;

const InfoLabel = styled.span`
  flex: 0 0 2.25rem;
  color: ${ReservationColors.gray10};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.022rem;
`;

const InfoValue = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
  color: ${ReservationColors.gray40};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.025rem;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

const Label = styled.label`
  color: ${ReservationColors.gray40};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
`;

const Legend = styled.legend`
  margin-bottom: 0.5rem;
  padding: 0;
  color: ${ReservationColors.gray40};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
`;

const InputFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  height: 3.25rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid ${ReservationColors.gray30};
  border-radius: 0.75rem;
  background-color: ${ColorData.colors.background};

  svg {
    flex: 0 0 auto;
    width: 1.25rem;
    height: 1.25rem;
    color: ${ReservationColors.gray40};
  }
`;

const Input = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: ${ReservationColors.gray40};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.025rem;
  outline: none;

  &::placeholder {
    color: ${ReservationColors.gray10};
  }
`;

const CounterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
`;

const CounterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;

const CounterLabel = styled.span`
  color: ${ReservationColors.gray40};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.019rem;
`;

const CounterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.25rem;
  padding: 0 0.625rem;
  box-sizing: border-box;
  border: 1px solid ${ReservationColors.gray30};
  border-radius: 0.75rem;
  background-color: ${ColorData.colors.background};
`;

const CounterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: none;
  color: ${ReservationColors.gray40};
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover:not(:disabled) {
    background-color: ${ColorData.colors.fillNormal};
  }

  &:disabled {
    color: ${ColorData.colors.labelDisabled};
    cursor: not-allowed;
  }
`;

const CounterValue = styled.span`
  color: ${ReservationColors.gray40};
  font-size: 1rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`;

const ErrorMessage = styled.p`
  margin: 0;
  padding: ${ColorData.spacing[8]} ${ColorData.spacing[12]};
  border-radius: ${ColorData.radius.medium};
  background-color: ${ColorData.colors.negativeBackground};
  color: ${ColorData.colors.negative};
  font-size: ${ColorData.typography.caption.fontSize};
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $variant: "primary" | "secondary" }>`
  flex: 1 1 0;
  min-width: 0;
  height: 3.25rem;
  padding: 0 1.25rem;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary" ? ReservationColors.blue : ReservationColors.gray30};
  border-radius: 0.75rem;
  background-color: ${({ $variant }) =>
    $variant === "primary" ? ReservationColors.blue : ColorData.colors.background};
  color: ${({ $variant }) =>
    $variant === "primary" ? ColorData.colors.background : ReservationColors.gray40};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    filter: brightness(0.94);
  }

  &:disabled {
    cursor: not-allowed;
    ${({ $variant }) =>
      $variant === "primary" &&
      `
      border-color: ${ReservationColors.gray10};
      background-color: ${ReservationColors.gray10};
    `}
  }
`;
