const STATUS_MESSAGES: Record<number, string> = {
  400: "입력한 예약 정보를 다시 확인해 주세요.",
  404: "입력한 이름과 전화번호로 등록된 회원을 찾지 못했어요. 회원 정보를 확인해 주세요.",
  409: "이미 예약된 시간이거나, 같은 사람이 이미 예약한 시간이에요.",
};

const DEFAULT_MESSAGE = "예약을 추가하지 못했어요. 다시 시도해 주세요.";

// 공용 응답 가로채기(setupAuthInterceptors)가 서버 오류를 `status`가 붙은 Error로 바꿔 넘김
const hasHttpStatus = (error: Error): error is Error & { status: number } =>
  "status" in error && typeof error.status === "number";

// 서버가 문구를 안 보내면 axios 기본 문구가 들어오므로 걸러냄
const getServerMessage = (error: Error) =>
  /^Request failed with status code/.test(error.message) ||
  error.message === "알 수 없는 오류"
    ? ""
    : error.message;

export const getCreateReservationErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) return DEFAULT_MESSAGE;

  if (!hasHttpStatus(error)) return error.message || DEFAULT_MESSAGE;

  const { status } = error;
  const statusMessage = STATUS_MESSAGES[status];

  if (statusMessage) return statusMessage;

  if (status >= 500) {
    return "일시적인 문제로 예약을 추가하지 못했어요. 잠시 뒤 다시 시도해 주세요.";
  }

  return getServerMessage(error) || DEFAULT_MESSAGE;
};
