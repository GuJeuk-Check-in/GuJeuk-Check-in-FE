import { useQuery } from '@tanstack/react-query';
import { userList, usersByResidence } from '../userApi';

export const useUserList = (filters = {}) => {
  const { residence = null, ...otherFilters } = filters;
  const isResidenceFilterActive = !!residence && residence !== '전체 지역';
  const queryKey = ['userList', filters];

  const queryFn = async () => {
    if (isResidenceFilterActive) {
      return usersByResidence(residence);
    } else {
      let allUsers = [];
      let page = 0;
      let hasMore = true;

      while (hasMore) {
        const response = await userList(page);

        const users = response?.users || response?.slice?.content || response;

        if (Array.isArray(users) && users.length > 0) {
          allUsers = [...allUsers, ...users];
          page++;
          hasMore = users.length > 0;
        } else {
          hasMore = false;
        }
      }

      return {
        users: allUsers,
        totalCount: allUsers.length,
      };
    }
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};
