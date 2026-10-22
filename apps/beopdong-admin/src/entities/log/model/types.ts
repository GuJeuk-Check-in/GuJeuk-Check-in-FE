export interface UserVisitSummary {
  id: number;
  name: string;
  purposes: readonly string[];
  headCount: number;
  visitDate: string;
}

export interface UserVisitDetailRecord {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  visitTime: string;
  purposes: readonly string[];
  visitDate: string;
}
