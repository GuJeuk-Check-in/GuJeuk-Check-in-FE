import { useQuery } from '@tanstack/react-query';
import { userList, usersByResidence } from '../userApi';

/**
 * @param {{ page?: number, residence?: string | null, [key: string]: any }} filters
 * @returns {import('@tanstack/react-query').UseQueryResult<any, Error>}
 */
export const useUserList = (filters = {}) => {
  const { page = 0, residence = null, ...otherFilters } = filters;
  const isResidenceFilterActive = !!residence && residence !== '전체 지역';
  const queryKey = ['userList', filters];

  const queryFn = async () => {
    if (isResidenceFilterActive) {
      return usersByResidence(residence);
    } else {
      return userList(page);
    }
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};
