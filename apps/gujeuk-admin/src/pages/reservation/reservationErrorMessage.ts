const SERVER_MESSAGES: Record<string, string> = {
  "해당 유저가 존재 하지 않습니다.":
    "입력한 이름과 전화번호로 등록된 회원을 찾지 못했어요. 회원 정보를 확인해 주세요.",
  "존재하지 않는 방문목적입니다.":
    "이 시설을 찾지 못했어요. 새로고침한 뒤 다시 시도해 주세요.",
  "예약할 수 없는 방문 목적입니다.":
    "이 시설은 지금 예약을 받지 않아요. 새로고침한 뒤 다시 확인해 주세요.",
  "이미 해당 시간의 예약이 존재합니다.":
    "이미 다른 예약이 있는 시간이에요. 새로고침한 뒤 다른 시간을 골라 주세요.",
};

const STATUS_MESSAGES: Record<number, string> = {
  400: "입력한 예약 정보를 다시 확인해 주세요.",
  409: "이미 다른 예약이 있는 시간이에요. 새로고침한 뒤 다른 시간을 골라 주세요.",
};

const DEFAULT_MESSAGE = "예약을 추가하지 못했어요. 다시 시도해 주세요.";

const hasHttpStatus = (error: Error): error is Error & { status: number } =>
  "status" in error && typeof error.status === "number";

const getServerMessage = (error: Error) =>
  /^Request failed with status code/.test(error.message) ||
  error.message === "알 수 없는 오류"
    ? ""
    : error.message.trim();

export const getCreateReservationErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) return DEFAULT_MESSAGE;

  if (!hasHttpStatus(error)) return error.message || DEFAULT_MESSAGE;

  const { status } = error;
  const serverMessage = getServerMessage(error);
  const knownMessage = SERVER_MESSAGES[serverMessage] ?? STATUS_MESSAGES[status];

  if (knownMessage) return knownMessage;

  if (status >= 500) {
    return "일시적인 문제로 예약을 추가하지 못했어요. 잠시 뒤 다시 시도해 주세요.";
  }

  return serverMessage || DEFAULT_MESSAGE;
};
