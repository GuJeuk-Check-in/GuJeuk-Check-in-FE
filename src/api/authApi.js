import { axiosInstance } from './axiosInstance';

/**
 * @param {string} password
 * @returns {Promise<object>}
 */

export const EnterPassword = async (password) => {
  console.log('EnterPassword 실행됨:', password);

  const response = await axiosInstance.post('/admin/login', {
    passward: password,
  });
  return response.data;
};

