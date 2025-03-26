import { UserPlanType, UserRoleType, UserStatusType } from "@repo/types";

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

// once passing the auth middleware, we will get the below data
export interface TokenDataInterface {
  id: string;
  userName: string;
  email: string;
  userAgent: string;
  status: UserStatusType;
  role: UserRoleType; // re-generate the token while updating the role
  plan: UserPlanType; // re-generate the token while updating the plan
  generalSettingsCode: number;
  privacySettingsCode: number;
  accessTokenData: AccessTokenInterface;
}
