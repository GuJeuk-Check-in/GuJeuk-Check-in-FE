import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInformation } from '@entities/user/api/user.api';
import { UserInformation } from '@entities/user';

export const useUpdateUserInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<UserInformation, 'id'>; // 데이터 업데이트 시 id는 필요하지 않으므로 Omit을 사용하여 제외
    }) => updateUserInformation(id, data), // updateUserInformation 함수를 호출하여 사용자 정보를 업데이트
    onSuccess: (data) => {
      queryClient.invalidateQueries({ // 성공적으로 업데이트된 후, 관련 쿼리를 무효화하여 최신 데이터를 가져오도록 함
        queryKey: ['user', String(data.id)], // 사용자 정보 쿼리 키를 기반으로 무효화
      });
    },
  });
};
