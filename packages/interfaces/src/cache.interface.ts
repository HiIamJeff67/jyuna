import { UserPlanType, UserRoleType, UserStatusType } from "@repo/types";

export interface SetAccessTokenCacheInterface {
  id: string;
  userName: string;
  email: string;
  userAgent: string;
  status: UserStatusType;
  role: UserRoleType;
  plan: UserPlanType;
  generalSettingsCode: number;
  privacySettingsCode: number;
}
