export interface UsageRecord {
  id: number;
  name: string;
  detail: string;
  purposeName: string;
  startTime: string;
  endTime: string;
  purposeRemainTime: number;
}

export interface UsageHistoryRecord {
  id: number;
  name: string;
  detail: string;
  purposeName: string;
  startTime: string;
  endTime: string;
  visitDate: string;
}

interface UsageStatusBase {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  purposeRemainTime: number;
}

export interface PcUsage extends UsageStatusBase {
  seat: number;
}

export interface GroupUsage extends UsageStatusBase {
  count: number;
}

export interface UsageStatus {
  pc: PcUsage[];
  pingPong: GroupUsage | null;
  sing: GroupUsage | null;
}

export interface UsageStatusResponse {
  usageStatus: UsageStatus;
}

export interface UsageHistoryDetail {
  purpose: number;
  name: string;
  visitDate: string;
  usePurpose: string | null;
  startTime: string;
  endTime: string;
  seat: number | null;
  count: number | null;
}
