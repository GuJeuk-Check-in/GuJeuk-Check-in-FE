import styled from '@emotion/styled';
import { DetailInput, TimePickerField } from '@center/ui/form';
import { IoMdPerson } from 'react-icons/io';
import { TbTargetArrow } from 'react-icons/tb';
import { CalendarIcon, SeatIcon } from '@shared/ui/icons';
import { formatDateKoreanPadded } from '@shared/lib/formatDate';
import { toHourMinute, toHourMinuteSecond } from '@shared/lib/formatTime';
import type { UsageHistoryDetail } from '../model/types';
import { UsageSeatChips } from './UsageSeatChips';

export type UsageTimeField = 'startTime' | 'endTime';

interface UsageHistoryDetailFieldsProps {
  readonly detail: UsageHistoryDetail;
  readonly isEditing: boolean;
  readonly onChange: (patch: Partial<UsageHistoryDetail>) => void;
  readonly openField: UsageTimeField | null;
  readonly onOpenFieldChange: (field: UsageTimeField | null) => void;
}

const SEAT_COUNT = 10;

export const UsageHistoryDetailFields = ({
  detail,
  isEditing,
  onChange,
  openField,
  onOpenFieldChange,
}: UsageHistoryDetailFieldsProps) => {
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
        highlightOnFocus
        onChange={(event) => onChange({ name: event.target.value })}
      />
      <DetailInput
        label="방문날짜"
        value={formatDateKoreanPadded(detail.visitDate)}
        icon={<CalendarIcon />}
      />
      {detail.count !== null && (
        <DetailInput
          label="인원"
          value={detail.count || ''}
          placeholder="인원을 입력해주세요"
          icon={<IoMdPerson />}
          inputMode="numeric"
          isEditable={isEditing}
          highlightOnFocus
          onChange={(event) => onChange({ count: Number(event.target.value.replace(/\D/g, '')) })}
        />
      )}
      {detail.usePurpose !== null && (
        <DetailInput
          label="사용 목적"
          value={detail.usePurpose}
          icon={<TbTargetArrow />}
          isEditable={isEditing}
          highlightOnFocus
          onChange={(event) => onChange({ usePurpose: event.target.value })}
        />
      )}
      {renderTimeField('startTime', '시작 시간')}
      {renderTimeField('endTime', '종료 시간')}
      {detail.seat !== null && (isEditing ? (
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
