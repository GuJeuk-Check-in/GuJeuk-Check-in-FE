import axiosInstance from './axiosInstance';
import useAuthStore from '../store/authStore';
import axios from 'axios';

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

export const exportVisitListToExcel = async () => {
  const { token } = useAuthStore.getState();

  const excelAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  try {
    const response = await excelAxios.get('/admin/excel', {
      responseType: 'blob',
      transformResponse: [(data) => data],
    });

    console.log('서버로부터 받은 응답 Blob 크기:', response.data.size, 'bytes');

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `시설이용목록_${date}.xlsx`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return '엑셀 파일 다운로드 성공';
  } catch (error) {
    console.error('엑셀 파일 다운로드 실패 (인터셉터 우회 후):', error);

    let errorMessage = '엑셀 내보내기 중 알 수 없는 오류가 발생했습니다.';
    if (error.response?.status) {
      errorMessage = `엑셀 내보내기 실패: ${error.response.status} 오류`;
    } else if (error.message) {
      errorMessage = `엑셀 내보내기 실패: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
};

export const updateVisitList = async ({
  id,
  name,
  age,
  phone,
  maleCount,
  femaleCount,
  purpose,
  visitDate,
  privacyAgreed,
}) => {
  if (!id) {
    throw new Error('수정할 ID가 필요합니다.');
  }

  const response = await axiosInstance.patch(`/admin/list/${id}`, {
    name,
    age,
    phone,
    maleCount,
    femaleCount,
    purpose,
    visitDate,
    privacyAgreed,
  });

  return response.data;
};
