export enum NotificationType {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "push",
}

export enum NotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
  DELIVERED = "delivered",
}

export enum NotificationChannel {
  MAILJET = "mailjet",
  TWILIO = "twilio",
  FIREBASE = "firebase",
  ONESIGNAL = "onesignal",
}

export interface NotificationModel {
  id: string;
  type: NotificationType;
  channel: NotificationChannel;
  status: NotificationStatus;
  recipient: string;
  subject?: string;
  content: string;
  metadata?: Record<string, unknown>;
  sentAt?: Date;
  deliveredAt?: Date;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}
