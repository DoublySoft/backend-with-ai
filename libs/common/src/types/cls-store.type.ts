export interface ClsStore {
  requestId?: string;
  correlationId?: string;
  userId?: string;
  [key: string]: unknown;
}
