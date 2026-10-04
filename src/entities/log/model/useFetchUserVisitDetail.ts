/*
  코드 주석 작성일: 2026/09/27
  작성자: 박민건
  전체적인 기능: tanstack query를 이용해서 id가 바뀔 때마다 새로운 쿼리를 계속만듬
*/


import { useQuery } from '@tanstack/react-query';
import { fetchUserVisitDetail } from '../api/log.api';

//기능: id가 바뀔 때마다 새로운 쿼리를 새성함.
export const useFetchUserVisitDetail = (id) => {
  const enabled = !!id && id !== 'new';

  return useQuery({
    //id가 변동될 때 마다 visitDetail 쿼리 키를 새로 캐싱함
    queryKey: ['visitDetail', id],
    queryFn: () => fetchUserVisitDetail(id),
    //enabled가 true 일떄만
    enabled: enabled,
    // 신선한 데이터가 유지되는 시간
    staleTime: 1000 * 60 * 5,
  });
};
