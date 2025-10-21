import axiosInstance from './axiosInstance';

/**
 * @param {string} purpose
 * @returns {Promise<any>}
 */

export const purposeList = async () => {
  const response = await axiosInstance.get('/purpose/all');
  return response.data;
};

export const createPurpose = async (purpose) => {
  const requestBody = {
    purpose: purpose,
  };
  const response = await axiosInstance.post('/purpose', requestBody);
  return response.data;
};

export const deletePurpose = async (id) => {
  try {
    const response = await axiosInstance.delete(`/purpose/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} 이용 기록 삭제 실패:`, error);
    throw error;
  }
};
