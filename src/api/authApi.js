import { axiosInstance } from './axiosInstance';

/**
 * @param {string} password
 * @returns {Promise<object>}
 */

/**
 * @param {string} currentPassword
 * @param {string} newPassword
 * @param {string} checkNewPassword
 */

export const EnterPassword = async (password) => {
  console.log('EnterPassword 실행됨:', password);

  const response = await axiosInstance.post('/admin/login', { password });
  return response.data;
};

export const UpdatePassword = async (
  currentPassword,
  newPassword,
  checkNewPassword
) => {
  const response = await axiosInstance.patch('/admin/change', {
    Password: currentPassword,
    'new-password': newPassword,
    'check-new-password': checkNewPassword,
  });
  return response.data;
};
