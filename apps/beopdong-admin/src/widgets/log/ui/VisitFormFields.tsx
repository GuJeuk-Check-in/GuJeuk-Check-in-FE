import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { DetailInput, formatPhone, SelectOption, TimePickerField, VisitDatePicker } from '@center/ui/form';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { MdDescription } from 'react-icons/md';
import { adminTokens } from '@center/tokens';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';
import { formatAge } from '@shared/lib/formatAge';
import { getPhoneError } from '@shared/lib/phoneError';
import type { VisitFormData, VisitFormVariant } from '../model/visitForm';

interface VisitFormFieldsProps {
  readonly value: VisitFormData;
  readonly onChange: (value: VisitFormData) => void;
  readonly purposeOptions: readonly string[];
  readonly variant?: VisitFormVariant;
  readonly children?: ReactNode;
}

export const VisitFormFields = ({
  value,
  onChange,
  purposeOptions,
  variant = 'minor',
  children,
}: VisitFormFieldsProps) => (
  <Fields>
    <InputRow>
      <DetailInput
        label="이름"
        value={value.name}
        placeholder="이름을 입력하세요"
        icon={<IoMdPerson />}
        isEditable
        onChange={(event) => onChange({ ...value, name: event.target.value })}
      />
      <DetailInput
        label="연령"
        value={value.age}
        placeholder="연령을 입력해주세요 ex) 16세"
        icon={<CalendarIcon />}
        inputMode="numeric"
        isEditable
        onChange={(event) => onChange({ ...value, age: event.target.value })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onChange({ ...value, age: formatAge(value.age) });
        }}
      />
    </InputRow>
    <SelectOption
      label="성별"
      value={value.gender}
      placeholder="성별을 선택해주세요"
      options={['여자', '남자']}
      icon={<IoMdPerson />}
      onChange={(gender) => onChange({ ...value, gender })}
    />
    {variant === 'minor' && (
      <DetailInput
        label="연락처"
        value={value.phone}
        placeholder="연락처를 입력해주세요 ex) 010-1234-5678"
        icon={<PhoneIcon />}
        type="tel"
        isEditable
        errorMessage={getPhoneError(value.phone)}
        onChange={(event) => onChange({ ...value, phone: event.target.value })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onChange({ ...value, phone: formatPhone(value.phone) });
        }}
      />
    )}
    <TimePickerField
      label="방문 시각"
      value={value.visitTime}
      onChange={(visitTime) => onChange({ ...value, visitTime })}
    />
    <SelectOption
      label="이용대장"
      variant="outline"
      multiple
      value={value.purposes}
      placeholder="이용대장을 선택해주세요"
      icon={<IoLocationSharp />}
      options={purposeOptions}
      onChange={(purposes) => onChange({ ...value, purposes })}
    />
    <VisitDatePicker
      label="방문날짜"
      icon={<CalendarIcon />}
      variant="wide"
      value={value.visitDate}
      onChange={(visitDate) => onChange({ ...value, visitDate })}
    />
    {variant === 'adult' && (
      <DetailInput
        label="방문목적"
        value={value.visitPurpose}
        placeholder="방문목적을 입력해주세요"
        icon={<IoLocationSharp />}
        isEditable
        onChange={(event) => onChange({ ...value, visitPurpose: event.target.value })}
      />
    )}
    <NoteField>
      <DetailInput
        label="비고사항"
        value={value.note ?? ''}
        placeholder="추가로 적을 내용을 적어주세요 (엑셀에는 작성되지 않음)"
        icon={<MdDescription />}
        isEditable
        onChange={(event) => onChange({ ...value, note: event.target.value || null })}
      />
    </NoteField>
    {children}
  </Fields>
);

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 40rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const NoteField = styled.div`
  & input::placeholder {
    color: ${({ theme }) => adminTokens(theme).colors.text};
    opacity: 1;
  }
`;
