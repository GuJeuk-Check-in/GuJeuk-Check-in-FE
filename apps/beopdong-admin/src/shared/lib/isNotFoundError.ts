import { isAxiosError } from 'axios';

export const isNotFoundError = (error: unknown) => isAxiosError(error) && error.response?.status === 404;
