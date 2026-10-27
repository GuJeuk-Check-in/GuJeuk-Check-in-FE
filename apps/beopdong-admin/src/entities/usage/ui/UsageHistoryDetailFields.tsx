import styled from '@emotion/styled';
import { DetailInput, SelectOption, TimePickerField } from '@center/ui/form';
import { IoMdPerson } from 'react-icons/io';
import { MdOutlineChair } from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';
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
const SEAT_OPTIONS = Array.from({ length: SEAT_COUNT }, (_, index) => `${index + 1}번`);

const toPickerTime = (time: string) => time.slice(0, 5);
const toApiTime = (time: string) => `${time}:00`;

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
      value={toPickerTime(detail[field])}
      onChange={(time) => onChange({ [field]: toApiTime(time) })}
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
        isEditable
        highlightOnFocus
        onChange={(event) => onChange({ name: event.target.value })}
      />
      {detail.count !== null && (
        <DetailInput
          label="인원"
          value={detail.count || ''}
          placeholder="인원을 입력해주세요"
          icon={<IoMdPerson />}
          inputMode="numeric"
          isEditable
          highlightOnFocus
          onChange={(event) => onChange({ count: Number(event.target.value.replace(/\D/g, '')) })}
        />
      )}
      {detail.usePurpose !== null && (
        <DetailInput
          label="사용 목적"
          value={detail.usePurpose}
          icon={<TbTargetArrow />}
          isEditable
          highlightOnFocus
          onChange={(event) => onChange({ usePurpose: event.target.value })}
        />
      )}
      {renderTimeField('startTime', '시작 시간')}
      {renderTimeField('endTime', '종료 시간')}
      {detail.seat !== null && (isEditing ? (
        <SelectOption
          label="좌석"
          value={`${detail.seat}번`}
          options={SEAT_OPTIONS}
          icon={<MdOutlineChair />}
          highlightOnFocus
          onChange={(option) => onChange({ seat: Number.parseInt(option, 10) })}
        />
      ) : (
        <UsageSeatChips
          seatCount={SEAT_COUNT}
          selected={detail.seat}
          onSelect={(seat) => onChange({ seat })}
        />
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
