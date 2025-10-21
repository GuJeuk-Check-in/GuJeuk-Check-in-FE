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
    const response = await axiosInstance.delete(`/admin/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} 이용 기록 삭제 실패:`, error);
    throw error;
  }
};

/**
 * @param {object} visitData
 * @param {string} visitData.name
 * @param {string} visitData.age
 * @param {string} visitData.phone
 * @param {number} visitData.maleCount
 * @param {number} visitData.femaleCount
 * @param {string} visitData.purpose
 * @param {string} visitData.visitDate
 * @param {boolean} visitData.privacyAgreed
 * @returns {Promise<object>}
 */

export const createUserVisit = async (visitData) => {
  try {
    const response = await axiosInstance.post(`/admin/list/create`, visitData);
    return response.data;
  } catch (error) {
    console.error('시설 이용 기록 추가 실패:', error);
    throw error;
  }
};

export const fetchUserVisitDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} 이용 기록 상세 조회 실패:`, error);
    throw error;
  }
};
