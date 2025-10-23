import axiosInstance from './axiosInstance';

export const userList = async (page = 0) => {
  const response = await axiosInstance.get('/admin/user/all', {
    params: {
      page: page,
    },
  });

  return response.data;
};

export const usersByResidence = async (residence) => {
  const residenceParam = residence === '기타 지역' ? '기타' : residence;
  const response = await axiosInstance.get('/admin/user', {
    params: {
      residence: residenceParam,
    },
  });
  return response.data;
};
