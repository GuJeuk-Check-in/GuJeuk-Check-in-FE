import styled from '@emotion/styled';
import {
  DetailInput,
  SelectOption,
  VisitDatePicker,
  formatDateKoreanPadded,
  formatDateToISOString,
  formatPhone,
} from '@center/ui/form';
import { FaSchool } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import {
  formatGender,
  formatRoute,
  GENDER_OPTIONS,
  parseGender,
  parseRoute,
  ROUTE_OPTIONS,
} from '../lib/formatUserDetail';
import type { UserDetail } from '../model/types';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';
import { getPhoneError } from '@shared/lib/phoneError';

interface UserDetailFieldsProps {
  readonly user: UserDetail;
  readonly isEditing: boolean;
  readonly onChange: (patch: Partial<UserDetail>) => void;
}

const EMPTY = '—';

const formatPickedDate = (date: Date) => formatDateKoreanPadded(formatDateToISOString(date));
const DATE_ICON = <CalendarIcon />;

interface DateFieldProps {
  readonly label: string;
  readonly value: string;
  readonly isEditing: boolean;
  readonly onChange: (date: string) => void;
}

const DateField = ({ label, value, isEditing, onChange }: DateFieldProps) =>
  isEditing ? (
    <VisitDatePicker
      label={label}
      value={value}
      icon={DATE_ICON}
      variant="wide"
      span="double"
      formatValue={formatPickedDate}
      onChange={onChange}
    />
  ) : (
    <DetailInput label={label} value={value ? formatDateKoreanPadded(value) : EMPTY} icon={DATE_ICON} />
  );

export const UserDetailFields = ({ user, isEditing, onChange }: UserDetailFieldsProps) => {
  const handleRouteSelect = (label: string) => {
    const route = parseRoute(label);
    if (!route || route === user.route) return;
    onChange({ route, routeDetail: route === 'OTHER' ? '' : null });
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
        <DetailInput
          label="연락처"
          value={user.phone}
          icon={<PhoneIcon />}
          type="tel"
          isEditable={isEditing}
          errorMessage={getPhoneError(user.phone)}
          onChange={(event) => onChange({ phone: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onChange({ phone: formatPhone(user.phone) });
          }}
        />
      </Row>
      <Row>
        <DetailInput
          label="학교"
          value={user.school}
          icon={<FaSchool />}
          isEditable={isEditing}
          onChange={(event) => onChange({ school: event.target.value })}
        />
        <DetailInput label="학년" value={`${user.grade}학년`} icon={<FaSchool />} />
      </Row>
      <Row>
        <DateField
          label="생년월일"
          value={user.birthYMD}
          isEditing={isEditing}
          onChange={(birthYMD) => onChange({ birthYMD })}
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
      <DateField
        label="신청일"
        value={user.applyDate}
        isEditing={isEditing}
        onChange={(applyDate) => onChange({ applyDate })}
      />
      <DetailInput
        label="주소"
        value={user.address}
        icon={<IoLocationSharp />}
        isEditable={isEditing}
        onChange={(event) => onChange({ address: event.target.value })}
      />
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
          value={formatRoute(user.route)}
          icon={<IoLocationSharp />}
        />
      )}
      {user.route === 'OTHER' && (
        <DetailInput
          label="기타 경로"
          value={user.routeDetail ?? (isEditing ? '' : EMPTY)}
          placeholder="알게된 경로를 직접 입력해주세요"
          icon={<IoLocationSharp />}
          isEditable={isEditing}
          onChange={(event) => onChange({ routeDetail: event.target.value })}
        />
      )}
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
