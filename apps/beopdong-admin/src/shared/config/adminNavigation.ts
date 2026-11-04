export const ADMIN_NAVIGATION = [
  { path: '/log', label: '방명록 조회', detailPath: '/log/:logId' },
  { path: '/log/create', label: '방명록 추가' },
  { path: '/usage/current', label: '현재 이용대장 현황' },
  { path: '/usage/history', label: '종료된 이용대장 기록' },
  { path: '/organ/user/all', label: '회원 목록 조회', detailPath: '/organ/user/:userId' },
  { path: '/purpose/all', label: '이용대장 관리' },
] as const;
