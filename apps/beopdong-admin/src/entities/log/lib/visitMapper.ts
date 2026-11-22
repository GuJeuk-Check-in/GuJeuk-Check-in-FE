import { toPhoneDigits } from '@center/ui/form';
import { findPurposeId, findPurposeName, type PurposeOption } from '@entities/purpose';
import { isAdultAge } from './isAdultAge';
import type {
  AdultVisitDetailResponse,
  VisitDetailResponse,
  VisitGenderDto,
  VisitListItemDto,
  VisitRequest,
} from '../model/dto';
import type { UserVisitDetailRecord, UserVisitSummary, VisitVariant } from '../model/types';

const UNKNOWN_PURPOSE_PREFIX = '이용대장 ';
const purposeNameById = (options: readonly PurposeOption[], id: number) =>
  findPurposeName(options, id) ?? `${UNKNOWN_PURPOSE_PREFIX}${id}`;
const purposeIdByName = (options: readonly PurposeOption[], name: string) => {
  const id = findPurposeId(options, name);
  if (id !== null) return id;
  const unknown = name.startsWith(UNKNOWN_PURPOSE_PREFIX) ? Number(name.slice(UNKNOWN_PURPOSE_PREFIX.length)) : NaN;
  return Number.isInteger(unknown) ? unknown : null;
};

const toPurposeIds = (options: readonly PurposeOption[], names: readonly string[]) => {
  const ids = names.map((name) => purposeIdByName(options, name));
  if (ids.some((id) => id === null)) throw new Error('이용대장 정보를 확인할 수 없습니다. 다시 선택해주세요.');
  return ids as number[];
};

const GENDER_LABEL: Record<VisitGenderDto, string> = { MAN: '남자', WOMAN: '여자' };

export const toVisitSummary = (dto: VisitListItemDto, options: readonly PurposeOption[]): UserVisitSummary => ({
  id: dto.id,
  name: dto.name,
  purposes: dto.purpose.map((id) => purposeNameById(options, id)),
  visitDate: dto.visitDate,
});

const isAdultDetail = (dto: VisitDetailResponse): dto is AdultVisitDetailResponse => isAdultAge(dto.age);

export const toVisitDetail = (
  id: number,
  dto: VisitDetailResponse,
  options: readonly PurposeOption[]
): UserVisitDetailRecord => ({
  id,
  name: dto.name,
  age: dto.age,
  gender: GENDER_LABEL[dto.gender] ?? dto.gender,
  phone: isAdultDetail(dto) ? '' : dto.phone,
  visitTime: dto.visitTime,
  visitDate: dto.visitDate,
  purposes: dto.purpose.map((purposeId) => purposeNameById(options, purposeId)),
  visitPurpose: isAdultDetail(dto) ? (dto.visitPurpose ?? null) : null,
  note: dto.note ?? null,
});

export interface VisitFormValues {
  name: string;
  age: string;
  gender: string;
  phone: string;
  visitTime: string;
  visitDate: string;
  purposes: readonly string[];
  visitPurpose: string;
  note: string | null;
}

const toGenderDto = (label: string): VisitGenderDto => (label === '남자' ? 'MAN' : 'WOMAN');

export const toVisitRequest = (
  form: VisitFormValues,
  variant: VisitVariant,
  options: readonly PurposeOption[]
): VisitRequest => {
  const base = {
    name: form.name.trim(),
    age: Number.parseInt(form.age, 10),
    gender: toGenderDto(form.gender),
    visitDate: form.visitDate,
    purpose: toPurposeIds(options, form.purposes),
    visitTime: form.visitTime,
    note: form.note?.trim() || null,
  };
  return variant === 'adult'
    ? { ...base, visitPurpose: form.visitPurpose.trim() }
    : { ...base, phone: toPhoneDigits(form.phone) };
};
