import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://gujeuk-api.dsmhs.kr/',
  headers: {
    'Content-Type': 'application/json',
  },
});
