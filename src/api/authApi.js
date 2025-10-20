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

export const UserVisitList = async (page = 0) => {
  const response = await axiosInstance.get(`/admin/list/all?page=${page}`);
  return response.data;
};

export const DeleteUserVisit = async (id) => {
  const response = await axiosInstance.delete(`/admin/delete/${id}`);
  return response.data;
};
