/*
  코드 주석 작성일: 2026/09/27
  작성자: 박민건
  전체적인 기능: entities 안에 있는 log 도메인에 쓸 데이터들의 데이터를 정의하고 있는 파일이다.
*/

import type { AgeType } from "./age";

// 기능: 방문자 기록에 데이터들의 타입을 정의하는 인터페이스이다.
export interface UserVisit {
  id: number;
  name: string | null;
  age: AgeType;
  phone: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  privacyAgreed: boolean;
}

// 기능: Page 단위 데이터들의 타입을 정의하는 인터페이스이다.
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

// 기능: 방문자 기록 목록의 응답 데이터들의 타입을 정의하는 인터페이스이다.
export interface UserVisitListResponse {
  content: UserVisit[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

// 기능: 월별 방문기록의 응답 데이터들의 타입을 정의한 인터페이스이다.
export interface MonthVisitListResponse {
  totalCount: number;
  slice: {
    content: UserVisit[];
    pageable: Pageable;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    numberOfElements: number;
    last: boolean;
    first: boolean;
    empty: boolean;
  };
}

//기능: 방문자 상세 기록의 응답 데이터들의 타입을 정의한 인터페이스이다.
export interface UserVisitDetailResponse {
  id: number;
  name: string | null;
  age: AgeType;
  phone: string;
  residence: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  visitTime: string;
  privacyAgreed: boolean;
}

// 기능: 방문자 기록을 만들 때 서버에 요청하는 데이터들의 타입을 정의한 인터페이스이다.
export interface CreateUserVisitRequest {
  name: string | null;
  age: AgeType;
  phone: string;
  residence?: string;
  maleCount: number;
  femaleCount: number;
  purpose: string;
  visitDate: string;
  visitTime: string;
  privacyAgreed: boolean;
}

// 기능: 위 CreateUserVisitRequest의 데이터와 데이터 타입을 상속하며 추가로 id라는 데이터의 타입을 정의하는 인터페이스 이다.
export interface UpdateUserVisitRequest extends CreateUserVisitRequest {
  id: number;
}

// 기능: 방문자 기록을 삭제할 떄 서버에 요청하는 데이터들의 타입을 정의한 인터페이스이다.
export interface DeleteUserVisitRequest {
  id: number;
}

// 기능: 방문자 기록을 삭제할 떄 받는 데이터를 string으로 타입을 지정한다.
export type DeleteUserVisitResponse = string;

// 기능: 방문자 기록 엑셀? 을 다운로드 할 떄 사용할 연도와 월의 데이터 값의 타입을 정의하는 인터페이스이다.
export interface ExportVisitListRequest {
  year: number;
  month: number;
}

// 가능: 방문자 통계를 서버에서 가져오는 연, 월 데이터 값의 타입을 정의하는 인터페이스 이다.
export interface VisitStatisticsRequest {
  year: number;
  month: number;
}

// 기능: 방문자 통계 그룹의 데이터 값들의 타입을 정의하는 인터페이스이다.
export interface VisitStatisticsGroup {
  male: number;
  female: number;
  total: number;
  rate: number;
}

// 기능: 방문자 통계를 서버에서 받을 때 데이터 값들의 타입을 정의하는 인터페이스이다.
export interface VisitStatisticsResponse {
  year: number;
  month: number;
  cumulative: {
    total: number;
    youth: VisitStatisticsGroup;
    other: VisitStatisticsGroup;
  };
  monthly: {
    total: number;
    youth: VisitStatisticsGroup;
    other: VisitStatisticsGroup;
  };
}

// 기능: 12월달의 키 값을 하나로 FACILITY_USAGE_MONTH_KEYS라는 객체 안에 묶어 놓는다.
export const FACILITY_USAGE_MONTH_KEYS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

//기능:  FACILITY_USAGE_MONTH_KEYS로 묶어놓은 값들을 타입으로 지정한다.
export type FacilityUsageMonthKey = (typeof FACILITY_USAGE_MONTH_KEYS)[number];

// 기능: 읽기 전용이라는 건 알겠는데 이것이 뭘하는 지는 잘 모르겠음
export type FacilityUsageValue = {
  readonly opDate: number | null;
  readonly avgRate: number | null;
};

export type FacilityUsageRequest = {
  readonly year: number;
};

export type FacilityUsageResponse = {
  readonly total: FacilityUsageValue;
} & {
  readonly [MonthKey in FacilityUsageMonthKey]: FacilityUsageValue;
};
