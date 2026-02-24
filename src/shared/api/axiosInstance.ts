import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
<<<<<<< HEAD

export const axiosPublicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
=======
>>>>>>> 4da692d (chore :: import 경로 변경)
