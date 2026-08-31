import type {
  ExistingUserCheckInRequest,
  GenderType,
  NewUserSignUpRequest,
} from '@entities/visit';

type PurposeOption = {
  readonly label: string;
};

type ParticipantCounts = {
  readonly maleCount: number;
  readonly femaleCount: number;
};

type SignupRequiredFieldsInput = ParticipantCounts & {
  readonly name: string;
  readonly phone: string;
  readonly gender: GenderType | '';
  readonly birthYear: string;
  readonly birthMonth: string;
  readonly birthDay: string;
  readonly residence: string;
  readonly selectedPurpose: string;
  readonly privacyAgreed: boolean;
};

type CompleteSignupRequiredFieldsInput = SignupRequiredFieldsInput & {
  readonly gender: GenderType;
};

type NewUserSignUpPayloadInput = ParticipantCounts & {
  readonly name: string;
  readonly phone: string;
  readonly gender: GenderType;
  readonly birthYMD: string;
  readonly residence: string;
  readonly selectedPurpose: string;
  readonly visitTime: string;
  readonly privacyAgreed: boolean;
};

type ExistingUserCheckInPayloadInput = ParticipantCounts & {
  readonly userId: number;
  readonly selectedPurpose: string;
  readonly visitTime: string;
};

export const resolveSelectedPurpose = (
  purposeOptions: readonly PurposeOption[],
  purposeIndex: number | null
) => (purposeIndex === null ? '' : purposeOptions[purposeIndex]?.label || '');

export const hasParticipants = ({
  maleCount,
  femaleCount,
}: ParticipantCounts) => maleCount + femaleCount > 0;

export const hasCompleteSignupRequiredFields = (
  fields: SignupRequiredFieldsInput
): fields is CompleteSignupRequiredFieldsInput =>
  !!fields.name.trim() &&
  !!fields.phone.trim() &&
  !!fields.gender &&
  !!fields.birthYear &&
  !!fields.birthMonth &&
  !!fields.birthDay &&
  !!fields.residence &&
  !!fields.selectedPurpose &&
  fields.privacyAgreed &&
  hasParticipants(fields);

export const createBirthYMD = (
  yearValue: string,
  monthValue: string,
  dayValue: string
) => {
  if (yearValue.length !== 4 || !monthValue || !dayValue) return null;

  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (
    !Number.isInteger(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day ||
    birthDate > today
  ) {
    return null;
  }

  return `${yearValue}-${String(month).padStart(2, '0')}-${String(day).padStart(
    2,
    '0'
  )}`;
};

export const buildNewUserSignUpPayload = ({
  name,
  phone,
  gender,
  maleCount,
  femaleCount,
  birthYMD,
  residence,
  selectedPurpose,
  visitTime,
  privacyAgreed,
}: NewUserSignUpPayloadInput): NewUserSignUpRequest => ({
  name: name.trim(),
  gender,
  phone: phone.trim(),
  maleCount,
  femaleCount,
  birthYMD,
  residence,
  purpose: selectedPurpose,
  visitTime,
  privacyAgreed,
});

export const buildExistingUserCheckInPayload = ({
  userId,
  maleCount,
  femaleCount,
  selectedPurpose,
  visitTime,
}: ExistingUserCheckInPayloadInput): ExistingUserCheckInRequest => ({
  userId,
  maleCount,
  femaleCount,
  purpose: selectedPurpose,
  visitTime,
});
