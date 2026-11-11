import axios from 'axios';
import { apiBaseUrl } from './apiBaseUrl';

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});
