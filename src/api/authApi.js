import { axiosInstance } from './axiosInstance';

/**
 * @param {string} password
 * @returns {Promise<object>}
 */

export const EnterPassword = async (password) => {
  const response = await axiosInstance.post('/admin/login', { password });
  return response.data;
};
