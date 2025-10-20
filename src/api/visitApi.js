import axiosInstance from './axiosInstance';

/**
 * @param {number} page
 * @returns {Promise<object>}
 */

export const fetchUserVisitList = async (page = 0) => {
  try {
    const response = await axiosInstance.get(`/admin/list/all?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('이용 기록 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * @param {number} id
 * @returns {Promise<object>}
 */

export const deleteUserVisit = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} 이용 기록 삭제 실패:`, error);
    throw error;
  }
};
