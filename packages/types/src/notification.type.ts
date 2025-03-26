import { NotificationEnum } from "@repo/enums";

export type NotificationType = keyof typeof NotificationEnum;

export const NotificationValues = Object.values(NotificationEnum) as [
  string,
  ...string[],
];
