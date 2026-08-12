import axios from 'axios';
import {
  READY_HEALTH_VALUES,
  type ReadyHealthResponse,
} from '../model/types';

const readyHealthAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isReadyHealthValue = (
  value: unknown
): value is ReadyHealthResponse['status'] =>
  value === READY_HEALTH_VALUES.UP || value === READY_HEALTH_VALUES.DOWN;

const parseReadyHealthResponse = (value: unknown): ReadyHealthResponse => {
  if (
    !isRecordObject(value) ||
    !isReadyHealthValue(value.status) ||
    !isReadyHealthValue(value.db)
  ) {
    throw new Error('ready health 응답 형식이 올바르지 않습니다.');
  }

  return {
    status: value.status,
    db: value.db,
  };
};

export const fetchReadyHealth = async (): Promise<ReadyHealthResponse> => {
  const response = await readyHealthAxiosInstance.get<unknown>(
    '/common/health/ready',
    { params: { checkedAt: Date.now() } }
  );

  return parseReadyHealthResponse(response.data);
};

export const isReadyForRemoteSync = (health: ReadyHealthResponse): boolean =>
  health.status === READY_HEALTH_VALUES.UP &&
  health.db === READY_HEALTH_VALUES.UP;
