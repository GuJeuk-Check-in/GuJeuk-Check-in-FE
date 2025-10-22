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
  const response = await axiosInstance.get('/admin/user', {
    params: {
      residence: residence,
    },
    s,
  });
  const data = response.data;
  return Array.isArray(data) ? data : [];
};
