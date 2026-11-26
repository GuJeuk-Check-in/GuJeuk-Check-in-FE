import { useId } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import {
  DetailInput,
  SelectOption,
  VisitDatePicker,
  formatDateKoreanPadded,
  formatDateToISOString,
} from '@center/ui/form';
import { FaSchool } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import {
  formatGender,
  formatRoute,
  GENDER_OPTIONS,
  MAX_GRADE_BY_SCHOOL_TYPE,
  parseGender,
  parseRoute,
  ROUTE_OPTIONS,
} from '../lib/formatUserDetail';
import type { UpdateUserRequest } from '../model/types';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';

interface UserDetailFieldsProps {
  readonly user: UpdateUserRequest;
  readonly visitCount?: number;
  readonly isEditing: boolean;
  readonly onChange: (patch: Partial<UpdateUserRequest>) => void;
  readonly onSchoolClick: () => void;
}

const EMPTY = '—';
const GRADE_OPTIONS = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'];

const formatPickedDate = (date: Date) => formatDateKoreanPadded(formatDateToISOString(date));
const DATE_ICON = <CalendarIcon />;

interface DateFieldProps {
  readonly label: string;
  readonly value: string;
  readonly span: 'full' | 'double';
  readonly isEditing: boolean;
  readonly onChange: (date: string) => void;
}

const DateField = ({ label, value, span, isEditing, onChange }: DateFieldProps) =>
  isEditing ? (
    <VisitDatePicker
      label={label}
      value={value}
      icon={DATE_ICON}
      variant="wide"
      span={span}
      formatValue={formatPickedDate}
      onChange={onChange}
    />
  ) : (
    <DetailInput label={label} value={value ? formatDateKoreanPadded(value) : EMPTY} icon={DATE_ICON} />
  );

const SchoolPickerField = ({ value, onClick }: { readonly value: string; readonly onClick: () => void }) => {
  const labelId = useId();
  const valueId = useId();

  return (
    <PickerContainer>
      <PickerLabel id={labelId}>학교</PickerLabel>
      <PickerButton type="button" aria-haspopup="dialog" aria-labelledby={`${labelId} ${valueId}`} onClick={onClick}>
        <PickerIcon aria-hidden="true"><FaSchool /></PickerIcon>
        <PickerValue id={valueId}>{value}</PickerValue>
      </PickerButton>
    </PickerContainer>
  );
};

export const UserDetailFields = ({ user, visitCount, isEditing, onChange, onSchoolClick }: UserDetailFieldsProps) => {
  const gradeOptions = user.schoolType
    ? GRADE_OPTIONS.slice(0, MAX_GRADE_BY_SCHOOL_TYPE[user.schoolType])
    : GRADE_OPTIONS;

  const handleRouteSelect = (label: string) => {
    const route = parseRoute(label);
    if (!route || route === user.route) return;
    onChange({ route });
  };

  return (
    <Fields>
      <Row>
        <DetailInput
          label="이름"
          value={user.name}
          icon={<IoMdPerson />}
          isEditable={isEditing}
          onChange={(event) => onChange({ name: event.target.value })}
        />
        {isEditing ? (
          <SelectOption
            label="성별"
            value={formatGender(user.gender)}
            options={GENDER_OPTIONS}
            icon={<IoMdPerson />}
            onChange={(label) => onChange({ gender: parseGender(label) })}
          />
        ) : (
          <DetailInput
            label="성별"
            value={formatGender(user.gender)}
            icon={<IoMdPerson />}
          />
        )}
      </Row>
      <Row>
        <DateField
          label="생년월일"
          value={user.birthYMD}
          span="double"
          isEditing={isEditing}
          onChange={(birthYMD) => onChange({ birthYMD })}
        />
        <DateField
          label="가입한 날짜"
          value={user.applyDate}
          span="full"
          isEditing={isEditing}
          onChange={(applyDate) => onChange({ applyDate })}
        />
      </Row>
      <Row>
        {isEditing ? (
          <SchoolPickerField value={user.school} onClick={onSchoolClick} />
        ) : (
          <DetailInput label="학교" value={user.school} icon={<FaSchool />} />
        )}
        {isEditing ? (
          <SelectOption
            label="학년"
            value={GRADE_OPTIONS[user.grade - 1] ?? ''}
            options={gradeOptions}
            icon={<FaSchool />}
            onChange={(label) => onChange({ grade: gradeOptions.indexOf(label) + 1 })}
          />
        ) : (
          <DetailInput label="학년" value={`${user.grade}학년`} icon={<FaSchool />} />
        )}
      </Row>
      <DetailInput
        label="연락처"
        value={user.phone}
        icon={<PhoneIcon />}
        type="tel"
        isEditable={isEditing}
        onChange={(event) => onChange({ phone: event.target.value })}
      />
      <DetailInput
        label="주소"
        value={user.address}
        icon={<IoLocationSharp />}
        isEditable={isEditing}
        onChange={(event) => onChange({ address: event.target.value })}
      />
      <Row>
        {isEditing ? (
          <SelectOption
            label="알게된 경로"
            value={formatRoute(user.route)}
            options={ROUTE_OPTIONS}
            icon={<IoLocationSharp />}
            onChange={handleRouteSelect}
          />
        ) : (
          <DetailInput
            label="알게된 경로"
            value={(user.route === 'OTHER' && user.routeDetail) || formatRoute(user.route)}
            icon={<IoLocationSharp />}
          />
        )}
        <DetailInput
          label="방문 횟수"
          value={visitCount === undefined ? EMPTY : `${visitCount}회`}
          icon={<IoLocationSharp />}
        />
      </Row>
    </Fields>
  );
};

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;

const PickerLabel = styled.span`
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-weight: 500;
`;

const PickerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(${({ theme }) => adminTokens(theme).components.fieldHeight} + 0.125rem);
  padding: 0.75rem 1rem;
  border: 0.0625rem solid ${({ theme }) => adminTokens(theme).colors.fieldBorder};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  background: ${({ theme }) => adminTokens(theme).colors.white};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-family: inherit;
  font-size: ${({ theme }) => adminTokens(theme).typography.input};
  text-align: left;
  cursor: pointer;


  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primary};
  }
`;

const PickerIcon = styled.span`
  display: flex;
  flex-shrink: 0;
  font-size: 1.5rem;
`;

const PickerValue = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;
