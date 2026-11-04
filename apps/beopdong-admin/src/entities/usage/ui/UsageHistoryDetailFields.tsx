import { useState } from 'react';
import styled from '@emotion/styled';
import { DetailInput, TimePickerField, VisitDatePicker } from '@center/ui/form';
import { IoMdPerson } from 'react-icons/io';
import { TbTargetArrow } from 'react-icons/tb';
import { CalendarIcon, SeatIcon } from '@shared/ui/icons';
import { formatDateKoreanPadded, formatDateToISOString } from '@center/ui/form';
import { toHourMinute, toHourMinuteSecond } from '@shared/lib/formatTime';
import type { UsageHistoryDetail, UsageHistoryDetailPatch } from '../model/types';
import { getHeadcountError, toHeadcountValue } from '../lib/headcount';
import { UsageSeatChips } from './UsageSeatChips';

export type UsageTimeField = 'startTime' | 'endTime';

interface UsageHistoryDetailFieldsProps {
  readonly detail: UsageHistoryDetail;
  readonly isEditing: boolean;
  readonly onChange: (patch: UsageHistoryDetailPatch) => void;
  readonly openField: UsageTimeField | null;
  readonly onOpenFieldChange: (field: UsageTimeField | null) => void;
}

const SEAT_COUNT = 10;

const formatPickedDate = (date: Date) => formatDateKoreanPadded(formatDateToISOString(date));

export const UsageHistoryDetailFields = ({
  detail,
  isEditing,
  onChange,
  openField,
  onOpenFieldChange,
}: UsageHistoryDetailFieldsProps) => {
  const [countText, setCountText] = useState(() => (detail.kind === 'group' && detail.count ? String(detail.count) : ''));
  const countError = getHeadcountError(countText);

  const renderTimeField = (field: UsageTimeField, label: string) => (
    <TimePickerField
      label={label}
      panelTitle={label}
      value={toHourMinute(detail[field])}
      disabled={!isEditing}
      onChange={(time) => onChange({ [field]: toHourMinuteSecond(time) })}
      open={openField === field}
      onOpenChange={(open) => onOpenFieldChange(open ? field : null)}
    />
  );

  return (
    <Fields>
      <DetailInput
        label="이름"
        value={detail.name}
        icon={<IoMdPerson />}
        isEditable={isEditing}
        onChange={(event) => onChange({ name: event.target.value })}
      />
      {isEditing ? (
        <VisitDatePicker
          label="방문날짜"
          value={detail.visitDate}
          icon={<CalendarIcon />}
          variant="wide"
          formatValue={formatPickedDate}
          onChange={(visitDate) => onChange({ visitDate })}
        />
      ) : (
        <DetailInput
          label="방문날짜"
          value={formatDateKoreanPadded(detail.visitDate)}
          icon={<CalendarIcon />}
        />
      )}
      {detail.kind === 'group' && (
        <DetailInput
          label="인원"
          value={countText}
          placeholder="인원을 입력해주세요"
          icon={<IoMdPerson />}
          inputMode="numeric"
          isEditable={isEditing}
          onChange={(event) => {
            const { value } = event.target;
            setCountText(value);
            onChange({ count: toHeadcountValue(value) });
          }}
          errorMessage={countError}
        />
      )}
      {detail.kind === 'pc' && (
        <DetailInput
          label="사용 목적"
          value={detail.usePurpose}
          icon={<TbTargetArrow />}
          isEditable={isEditing}
          onChange={(event) => onChange({ usePurpose: event.target.value })}
        />
      )}
      {renderTimeField('startTime', '시작 시간')}
      {renderTimeField('endTime', '종료 시간')}
      {detail.kind === 'pc' && (isEditing ? (
        <UsageSeatChips
          seatCount={SEAT_COUNT}
          selected={detail.seat}
          onSelect={(seat) => onChange({ seat })}
        />
      ) : (
        <DetailInput label="좌석" value={`${detail.seat}번`} icon={<SeatIcon />} />
      ))}
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
