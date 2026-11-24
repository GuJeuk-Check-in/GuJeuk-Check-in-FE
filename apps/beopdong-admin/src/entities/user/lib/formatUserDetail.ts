import type { Gender, SchoolType, UserRoute } from '../model/types';

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

const SCHOOL_TYPE_LABEL: Record<SchoolType, string> = {
  ELEMENTARY: '초등학교',
  MIDDLE: '중학교',
  HIGH: '고등학교',
};

export const SCHOOL_TYPE_OPTIONS = Object.values(SCHOOL_TYPE_LABEL);

export const MAX_GRADE_BY_SCHOOL_TYPE: Record<SchoolType, number> = {
  ELEMENTARY: 6,
  MIDDLE: 3,
  HIGH: 3,
};

export const formatSchoolType = (schoolType: SchoolType | null) =>
  schoolType ? SCHOOL_TYPE_LABEL[schoolType] : '';

export const parseSchoolType = (label: string) =>
  (Object.keys(SCHOOL_TYPE_LABEL) as SchoolType[]).find((schoolType) => SCHOOL_TYPE_LABEL[schoolType] === label) ?? null;

export const formatRoute = (route: UserRoute) => ROUTE_LABEL[route];

export const parseRoute = (label: string) =>
  (Object.keys(ROUTE_LABEL) as UserRoute[]).find((route) => ROUTE_LABEL[route] === label);

export const formatGender = (gender: Gender) => GENDER_LABEL[gender];

export const parseGender = (label: string): Gender =>
  (Object.keys(GENDER_LABEL) as Gender[]).find((gender) => GENDER_LABEL[gender] === label) ?? 'MAN';
