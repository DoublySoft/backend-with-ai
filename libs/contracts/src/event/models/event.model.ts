export enum EventExecutionType {
  SYSTEM = "system",
  USER = "user",
}

export interface EventModel {
  id: string;
  type: string;
  entityId: string;
  data: Record<string, unknown>;
  executedBy?: string;
  executionType: EventExecutionType;
  createdAt: Date;
}
