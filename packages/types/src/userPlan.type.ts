import { UserPlanEnum } from "@repo/enums";

export type UserPlanType = keyof typeof UserPlanEnum;

export const UserPlanValues = Object.values(UserPlanEnum) as [
  string,
  ...string[],
];
