import type { Gender, UserDetail } from '../model/types';

const GENDER_LABEL: Record<Gender, string> = {
  MAN: '남자',
  WOMAN: '여자',
};

export const GENDER_OPTIONS = Object.values(GENDER_LABEL);

export const ROUTE_OTHER = '기타';

const ROUTE_PRESETS = ['친구가 데려와서', '부모님의 권유로'];

export const ROUTE_OPTIONS = [...ROUTE_PRESETS, ROUTE_OTHER];

export const isCustomRoute = (route: string) => route !== '' && !ROUTE_PRESETS.includes(route);

export const formatGender = (gender: Gender) => GENDER_LABEL[gender];

export const parseGender = (label: string): Gender =>
  (Object.keys(GENDER_LABEL) as Gender[]).find((gender) => GENDER_LABEL[gender] === label) ?? 'MAN';

export const formatDateSlash = (date: string) =>
  date
    .split('-')
    .map((part, index) => (index === 0 ? part : part.padStart(2, '0')))
    .join('/');


export const isUserDetailChanged = (base: UserDetail, draft: UserDetail) =>
  (Object.keys(base) as (keyof UserDetail)[]).some((key) => base[key] !== draft[key]);
