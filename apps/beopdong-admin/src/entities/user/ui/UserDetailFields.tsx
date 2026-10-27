import styled from '@emotion/styled';
import { DetailInput, SelectOption, VisitDatePicker, formatDateToISOString } from '@center/ui/form';
import { FaSchool } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { MdCalendarMonth } from 'react-icons/md';
import {
  formatDateSlash,
  formatGender,
  GENDER_OPTIONS,
  parseGender,
} from '../lib/formatUserDetail';
import type { UserDetail } from '../model/types';
import { PhoneIcon } from '@shared/ui/icons';

interface UserDetailFieldsProps {
  readonly user?: UserDetail;
  readonly onChange?: (patch: Partial<UserDetail>) => void;
}

const EMPTY = '—';

const formatPickedDate = (date: Date) => formatDateSlash(formatDateToISOString(date));
const DATE_ICON = <MdCalendarMonth size={24} aria-hidden="true" />;

export const UserDetailFields = ({ user, onChange }: UserDetailFieldsProps) => {
  const isEditable = !!user && !!onChange;
  const edit = (patch: Partial<UserDetail>) => onChange?.(patch);

  return (
    <Fields>
      <Row>
        <DetailInput
          label="이름"
          value={user?.name ?? EMPTY}
          icon={<IoMdPerson />}
          isEditable={isEditable}
          highlightOnFocus
          onChange={(event) => edit({ name: event.target.value })}
        />
        <DetailInput
          label="학교"
          value={user?.school ?? EMPTY}
          icon={<FaSchool />}
          isEditable={isEditable}
          highlightOnFocus
          onChange={(event) => edit({ school: event.target.value })}
        />
      </Row>
      <Row>
        {isEditable ? (
          <VisitDatePicker
            label="생년월일"
            value={user.birthYMD}
            icon={DATE_ICON}
            variant="wide"
            highlightOnFocus
            formatValue={formatPickedDate}
            onChange={(birthYMD) => edit({ birthYMD })}
          />
        ) : (
          <DetailInput
            label="생년월일"
            value={user ? formatDateSlash(user.birthYMD) : EMPTY}
            icon={<MdCalendarMonth />}
          />
        )}
        {isEditable ? (
          <SelectOption
            label="성별"
            value={formatGender(user.gender)}
            options={GENDER_OPTIONS}
            icon={<IoMdPerson />}
            onChange={(label) => edit({ gender: parseGender(label) })}
          />
        ) : (
          <DetailInput
            label="성별"
            value={user ? formatGender(user.gender) : EMPTY}
            icon={<IoMdPerson />}
          />
        )}
      </Row>
      <Row>
        {isEditable ? (
          <VisitDatePicker
            label="신청일"
            value={user.applyDate}
            icon={DATE_ICON}
            variant="wide"
            highlightOnFocus
            formatValue={formatPickedDate}
            onChange={(applyDate) => edit({ applyDate })}
          />
        ) : (
          <DetailInput
            label="신청일"
            value={user ? formatDateSlash(user.applyDate) : EMPTY}
            icon={<MdCalendarMonth />}
          />
        )}
        <DetailInput
          label="연락처"
          value={user?.phone ?? EMPTY}
          icon={<PhoneIcon />}
          type="tel"
          isEditable={isEditable}
          highlightOnFocus
          onChange={(event) => edit({ phone: event.target.value })}
        />
      </Row>
      <DetailInput
        label="주소"
        value={user?.address ?? EMPTY}
        icon={<IoLocationSharp />}
        isEditable={isEditable}
        highlightOnFocus
        onChange={(event) => edit({ address: event.target.value })}
      />
      <DetailInput
        label="알게된 경로"
        value={user?.route ?? EMPTY}
        icon={<IoLocationSharp />}
        isEditable={isEditable}
        highlightOnFocus
        onChange={(event) => edit({ route: event.target.value })}
      />
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
