import type { Gender, UserRoute } from '../model/types';

const GENDER_LABEL: Record<Gender, string> = {
  MAN: '남자',
  WOMAN: '여자',
};

export const GENDER_OPTIONS = Object.values(GENDER_LABEL);

const ROUTE_LABEL: Record<UserRoute, string> = {
  FRIEND: '친구가 데려와서',
  PARENT: '부모님의 권유',
  OTHER: '기타',
};

export const ROUTE_OPTIONS = Object.values(ROUTE_LABEL);

export const formatRoute = (route: UserRoute) => ROUTE_LABEL[route];

export const parseRoute = (label: string) =>
  (Object.keys(ROUTE_LABEL) as UserRoute[]).find((route) => ROUTE_LABEL[route] === label);

export const formatGender = (gender: Gender) => GENDER_LABEL[gender];

export const parseGender = (label: string): Gender =>
  (Object.keys(GENDER_LABEL) as Gender[]).find((gender) => GENDER_LABEL[gender] === label) ?? 'MAN';
