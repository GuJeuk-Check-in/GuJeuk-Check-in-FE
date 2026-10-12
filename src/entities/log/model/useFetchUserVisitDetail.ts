/*
  코드 주석 작성일: 2026/09/27
  작성자: 박민건
  전체적인 기능: tanstack query를 이용해서 id가 바뀔 때마다 새로운 쿼리를 계속만든다.
*/


import { useQuery } from '@tanstack/react-query';
import { fetchUserVisitDetail } from '../api/log.api';
//기능: id가 바뀔 때마다 새로운 쿼리를 생성한다.

export const useFetchUserVisitDetail = (id) => {
  const enabled = !!id && id !== 'new';

    //id가 변동될 때 마다 visitDetail 쿼리 키를 새로 캐싱한다.
  return useQuery({
    queryKey: ['visitDetail', id],
    //enabled가 true 일때만 퀴리키가 만들어진다.
    queryFn: () => fetchUserVisitDetail(id),
    // 신선한 데이터가 유지되는 시간이다.
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
};
