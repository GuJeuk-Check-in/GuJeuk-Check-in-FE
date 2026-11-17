export interface PurposeListItem {
  id: number;
  purposeName: string;
}

export interface PurposeListResponse {
  purposes: PurposeListItem[];
}
