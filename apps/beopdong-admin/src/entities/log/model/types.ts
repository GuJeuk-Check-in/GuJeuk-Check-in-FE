export interface UserVisitSummary {
  id: number;
  name: string | null;
  purposes: readonly string[];
  visitDate: string;
  age?: number;
  canCheckOut?: boolean;
}

export interface UserVisitDetailRecord {
  id: number;
  name: string | null;
  age: number;
  gender: string;
  phone: string;
  visitTime: string;
  purposes: readonly string[];
  visitDate: string;
  visitPurpose?: string | null;
  note?: string | null;
}
