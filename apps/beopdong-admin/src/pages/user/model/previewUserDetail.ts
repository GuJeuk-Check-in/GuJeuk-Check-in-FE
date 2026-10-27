import type { UserDetail } from '@entities/user';

export const previewUserDetails: Readonly<Record<number, UserDetail>> = {
  1: { name: '김하늘', school: '법동중학교', grade: 3, birthYMD: '2011-03-12', phone: '010-0000-0000', gender: 'WOMAN', route: '친구가 데려와서', address: '대전광역시 대덕구 법동로 10', applyDate: '2026-03-04' },
  2: { name: '박서준', school: '법동중학교', grade: 2, birthYMD: '2012-06-15', phone: '010-0000-0000', gender: 'MAN', route: '부모님의 권유로', address: '대전광역시 대덕구 법동로 22', applyDate: '2026-04-12' },
  3: { name: '이서연', school: '법동초등학교', grade: 6, birthYMD: '2014-09-03', phone: '010-0000-0000', gender: 'WOMAN', route: '학교 선생님 소개', address: '대전광역시 대덕구 법동로 35', applyDate: '2026-05-20' },
  4: { name: '최지우', school: '중리중학교', grade: 1, birthYMD: '2013-01-20', phone: '010-0000-0000', gender: 'MAN', route: '포스터를 보고', address: '대전광역시 대덕구 중리로 8', applyDate: '2026-06-09' },
  5: { name: '정민준', school: '법동중학교', grade: 3, birthYMD: '2011-11-08', phone: '010-0000-0000', gender: 'MAN', route: '친구가 데려와서', address: '대전광역시 대덕구 법동로 51', applyDate: '2026-09-01' },
  6: { name: '김서윤', school: '법동초등학교', grade: 5, birthYMD: '2015-04-25', phone: '010-0000-0000', gender: 'WOMAN', route: '인터넷 검색', address: '대전광역시 대덕구 법동로 63', applyDate: '2026-10-04' },
};
