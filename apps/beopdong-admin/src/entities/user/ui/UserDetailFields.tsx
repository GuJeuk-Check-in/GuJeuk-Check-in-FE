import { useState } from 'react';
import styled from '@emotion/styled';
import { DetailInput, SelectOption, VisitDatePicker, formatDateToISOString } from '@center/ui/form';
import { FaSchool } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import {
  formatDateSlash,
  formatGender,
  GENDER_OPTIONS,
  isCustomRoute,
  parseGender,
  ROUTE_OPTIONS,
  ROUTE_OTHER,
} from '../lib/formatUserDetail';
import type { UserDetail } from '../model/types';
import { CalendarIcon, PhoneIcon } from '@shared/ui/icons';
import { formatPhone } from '@shared/lib/formatPhone';

interface UserDetailFieldsProps {
  readonly user?: UserDetail;
  readonly onChange?: (patch: Partial<UserDetail>) => void;
}

const EMPTY = '—';

const formatPickedDate = (date: Date) => formatDateSlash(formatDateToISOString(date));
const DATE_ICON = <CalendarIcon />;

export const UserDetailFields = ({ user, onChange }: UserDetailFieldsProps) => {
  const isEditable = !!user && !!onChange;
  const edit = (patch: Partial<UserDetail>) => onChange?.(patch);
  const [isOtherRoute, setIsOtherRoute] = useState(() => !!user && isCustomRoute(user.route));

  const handleRouteSelect = (option: string) => {
    const isOther = option === ROUTE_OTHER;
    setIsOtherRoute(isOther);
    edit({ route: isOther ? '' : option });
  };

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
            icon={<CalendarIcon />}
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
            icon={<CalendarIcon />}
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
          onKeyDown={(event) => {
            if (event.key === 'Enter' && user) edit({ phone: formatPhone(user.phone) });
          }}
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
      {isEditable ? (
        <>
          <SelectOption
            label="알게된 경로"
            value={isOtherRoute ? ROUTE_OTHER : user.route}
            options={ROUTE_OPTIONS}
            icon={<IoLocationSharp />}
            highlightOnFocus
            onChange={handleRouteSelect}
          />
          {isOtherRoute && (
            <DetailInput
              label="기타 (어떻게 알게 됐어?)"
              value={user.route}
              placeholder="알게된 경로를 직접 입력해주세요"
              icon={<IoLocationSharp />}
              isEditable
              highlightOnFocus
              onChange={(event) => edit({ route: event.target.value })}
            />
          )}
        </>
      ) : (
        <DetailInput
          label="알게된 경로"
          value={user?.route ?? EMPTY}
          icon={<IoLocationSharp />}
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
