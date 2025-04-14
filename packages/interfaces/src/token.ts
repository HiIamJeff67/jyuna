import { UserPlanType, UserRoleType, UserStatusType } from "@repo/types";

/* =============== The Structure(Interface) of Token =============== */
export interface AccessTokenInterface {
  accessToken: string;
  expiresIn: string;
}

export interface RefreshTokenInterface {
  refreshToken: string;
  expiresIn: string;
}

export interface TempTokenInterface {
  tempToken: string;
  expiresIn: string;
}
/* =============== The Structure(Interface) of Token =============== */

/* =============== The Payload of Generated the Token =============== */
// use the below data to generate the jwt token
export interface TokenPayloadInterface {
  sub: string;
  email: string;
  role: UserRoleType;
  plan: UserPlanType;
}

export interface RawTokenDataInterface extends TokenPayloadInterface {
  lat: number;
  exp: number;
}
/* =============== The Payload of Generated the Token =============== */

/* =============== The Data Inside the Payload of Token =============== */
// once passing the auth middleware, we will get the below data
export interface TokenDataInterface {
  id: string;
  userName: string;
  displayName: string;
  avatarURL: string | null;
  email: string;
  userAgent: string;
  status: UserStatusType;
  role: UserRoleType; // re-generate the token while updating the role
  plan: UserPlanType; // re-generate the token while updating the plan
  generalSettingsCode: number;
  privacySettingsCode: number;
  accessTokenData: AccessTokenInterface;
}
/* =============== The Data Inside the Payload of Token =============== */
