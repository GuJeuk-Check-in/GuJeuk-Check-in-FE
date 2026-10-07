import axios from 'axios';

interface ApiErrorBody {
  message?: string;
  description?: string;
}

export const getApiErrorMessage = (
  error: unknown,
  fallback = '요청 처리 중 오류가 발생했습니다.'
) => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return (
      error.response?.data?.description ||
      error.response?.data?.message ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
