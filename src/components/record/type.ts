export type ViewType = "records" | "daily" | "weekly" | "monthly";

export interface Record {
  id: string;
  count: number;
  createdAt: Date;
}

export interface UpdateRecordData {
  recordId: string;
  updatedData: {
    count?: number;
    date?: Date;
  };
}
