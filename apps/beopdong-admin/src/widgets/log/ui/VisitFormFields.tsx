import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { DetailInput, SelectOption, TimePickerField, VisitDatePicker } from '@center/ui/form';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';
import type { VisitFormData } from '../model/visitForm';

interface VisitFormFieldsProps {
  readonly value: VisitFormData;
  readonly onChange: (value: VisitFormData) => void;
  readonly purposeOptions: readonly string[];
  readonly children?: ReactNode;
}

export const VisitFormFields = ({
  value,
  onChange,
  purposeOptions,
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
    <DetailInput
      label="연락처"
      value={value.phone}
      placeholder="연락처를 입력해주세요 ex) 010-1234-5678"
      icon={<PhoneIcon />}
      type="tel"
      isEditable
      onChange={(event) => onChange({ ...value, phone: event.target.value })}
    />
    <TimePickerField
      label="방문 시각"
      value={value.visitTime}
      onChange={(visitTime) => onChange({ ...value, visitTime })}
    />
    <SelectOption
      label="이용대장"
      multiple
      value={value.purposes}
      placeholder="이용대장을 선택해주세요"
      icon={<IoLocationSharp />}
      options={purposeOptions}
      onChange={(purposes) => onChange({ ...value, purposes })}
    />
    <FullWidthField>
      <VisitDatePicker
        label="방문날짜"
        icon={<CalendarIcon />}
        variant="wide"
        highlightOnFocus
        value={value.visitDate}
        onChange={(visitDate) => onChange({ ...value, visitDate })}
      />
    </FullWidthField>
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

const FullWidthField = styled.div`
  & [role='group'] {
    width: 100%;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 40rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
