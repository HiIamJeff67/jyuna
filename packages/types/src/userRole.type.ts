import { UserRoleEnum } from "@repo/enums";

export type UserRoleType = keyof typeof UserRoleEnum;

export const UserRoleValues = Object.values(UserRoleEnum) as [
  string,
  ...string[],
];
