import { UserStatusEnum } from "@repo/enums";

export type UserStatusType = keyof typeof UserStatusEnum;

export const UserStatusValues = Object.values(UserStatusEnum) as [
  string,
  ...string[],
];
