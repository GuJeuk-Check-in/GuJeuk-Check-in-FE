import axiosInstance from './axiosInstance';

/**
 * @param {number} page
 * @returns {Promise<object>}
 */

export const fetchUserVisitList = async (page = 0) => {
  try {
    const response = await axiosInstance.get(`/admin/list/all?page=${page}`);

    if (response.data?.message && response.data?.description) {
      throw new Error(response.data.message);
    }

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
    console.error(`ID ${id} 이용 기록 삭제 실패:`, error.message);
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

export const exportVisitListToExcel = async ({ year, month }) => {
  try {
    const response = await axiosInstance.get(`/admin/excel/${year}-${month}`, {
      responseType: 'blob',
    });
    console.log('서버로부터 받은 응답 Blob 크기:', response.data.size, 'bytes');

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `시설이용목록_${year}-${month}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return '엑셀 파일 다운로드 성공';
  } catch (error) {
    console.error('엑셀 파일 다운로드 실패:', error);

    let errorMessage = '엑셀 내보내기 중 알 수 없는 오류가 발생했습니다.';

    if (error.response?.status) {
      const status = error.response.status;
      errorMessage = `엑셀 내보내기 실패: ${status} 오류`;

      if (error.response.data) {
        let errorBodyText = '';

        if (error.response.data instanceof Blob) {
          errorBodyText = await error.response.data.text();
        } else if (typeof error.response.data === 'string') {
          errorBodyText = error.response.data;
        }

        if (errorBodyText) {
          console.error(`서버 응답 상세 (HTTP ${status}):`, errorBodyText);

          const preview =
            errorBodyText.length > 50
              ? errorBodyText.slice(0, 50) + '...'
              : errorBodyText;
          errorMessage += ` (서버 메시지: ${preview})`;
        }
      }
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
