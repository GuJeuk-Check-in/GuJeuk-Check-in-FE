export interface UsageRecord {
  id: number;
  name: string;
  detail: string;
  purposeName: string;
  startTime: string;
  endTime: string;
  purposeRemainTime: number;
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
