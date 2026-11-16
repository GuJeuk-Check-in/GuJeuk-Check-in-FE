import { toPhoneDigits } from '@center/ui/form';
import { MANAGED_PURPOSES } from '@entities/purpose';
import type { CreateVisitRequest, UpdateVisitRequest, VisitDetailResponse, VisitGenderDto, VisitListItemDto } from '../model/dto';
import type { UserVisitDetailRecord, UserVisitSummary } from '../model/types';

// 이용목적 조회 API 연결 시 서버 id 기준 매핑으로 교체 (현재는 MANAGED_PURPOSES 순서를 id-1 로 가정)
const UNKNOWN_PURPOSE_PREFIX = '이용대장 ';
const purposeNameById = (id: number) => MANAGED_PURPOSES[id - 1] ?? `${UNKNOWN_PURPOSE_PREFIX}${id}`;
const purposeIdByName = (name: string) => {
  const index = MANAGED_PURPOSES.indexOf(name);
  if (index !== -1) return index + 1;
  const unknown = name.startsWith(UNKNOWN_PURPOSE_PREFIX) ? Number(name.slice(UNKNOWN_PURPOSE_PREFIX.length)) : NaN;
  return Number.isInteger(unknown) ? unknown : null;
};

const toPurposeIds = (names: readonly string[]) => {
  const ids = names.map(purposeIdByName);
  if (ids.some((id) => id === null)) throw new Error('이용대장 정보를 확인할 수 없습니다. 다시 선택해주세요.');
  return ids as number[];
};

const GENDER_LABEL: Record<VisitGenderDto, string> = { MAN: '남자', WOMAN: '여자' };

export const toVisitSummary = (dto: VisitListItemDto): UserVisitSummary => ({
  id: dto.id,
  name: dto.name,
  purposes: dto.purpose.map(purposeNameById),
  visitDate: dto.visitDate,
});

export const toVisitDetail = (id: number, dto: VisitDetailResponse): UserVisitDetailRecord => ({
  id,
  name: dto.name,
  age: dto.age,
  gender: GENDER_LABEL[dto.gender] ?? dto.gender,
  phone: dto.phone,
  visitTime: dto.visitTime,
  visitDate: dto.visitDate,
  purposes: dto.purpose.map(purposeNameById),
});

interface VisitFormValues {
  name: string;
  age: string;
  gender: string;
  phone: string;
  visitTime: string;
  visitDate: string;
  purposes: readonly string[];
}

export const toUpdateVisitRequest = (form: VisitFormValues): UpdateVisitRequest => ({
  name: form.name.trim(),
  purpose: toPurposeIds(form.purposes),
  age: Number.parseInt(form.age, 10),
  phone: toPhoneDigits(form.phone),
  gender: form.gender === '남자' ? 'MAN' : 'WOMAN',
  visitDate: form.visitDate,
  visitTime: form.visitTime,
});

export const toCreateVisitRequest = (form: VisitFormValues): CreateVisitRequest => {
  const { gender: _gender, ...rest } = toUpdateVisitRequest(form);
  return rest;
};
