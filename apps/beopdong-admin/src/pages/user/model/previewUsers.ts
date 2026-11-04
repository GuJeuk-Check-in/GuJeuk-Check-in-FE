import type { User } from '@entities/user';

export const previewUsers: readonly User[] = [
  { id: 1, name: '김하늘', school: '법동중학교', grade: 3, birthYMD: '2011.03.12', phone: '010-0000-0000', count: 12 },
  { id: 2, name: '박서준', school: '법동중학교', grade: 2, birthYMD: '2012.06.15', phone: '010-0000-0000', count: 8 },
  { id: 3, name: '이서연', school: '법동초등학교', grade: 6, birthYMD: '2014.09.03', phone: '010-0000-0000', count: 4 },
  { id: 4, name: '최지우', school: '중리중학교', grade: 1, birthYMD: '2013.01.20', phone: '010-0000-0000', count: 6 },
  { id: 5, name: '정민준', school: '법동중학교', grade: 3, birthYMD: '2011.11.08', phone: '010-0000-0000', count: 0 },
  { id: 6, name: '김서윤', school: '법동초등학교', grade: 5, birthYMD: '2015.04.25', phone: '010-0000-0000', count: 2 },
];
