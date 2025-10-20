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

/**
 * @param {number} page
 * @returns {Promise<object>}
 */

/**
 * @param {number} id
 */

export const EnterPassword = async (password) => {
  console.log('EnterPassword 실행됨:', password);

  const response = await axiosInstance.post('/admin/login', { password });
  return response.data;
};

export const UpdatePassword = async (
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  const response = await axiosInstance.patch('/admin/change', {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmNewPassword: confirmNewPassword,
  });
  return response.data;
};
