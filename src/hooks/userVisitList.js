import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserVisitList, deleteUserVisit } from '../api/visitApi';

export const useUserVisitList = (page) => {
  return useQuery({
    queryKey: ['visits', page],
    queryFn: () => fetchUserVisitList(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      alert('이용 기록이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      alert(`삭제 실패: ${error.message}`);
    },
  });
};
