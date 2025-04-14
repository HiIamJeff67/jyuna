import {
  LanguageType,
  ThemeType,
  TimeZoneType,
  UserGenderType,
  UserPlanType,
  UserRoleType,
  UserStatusType,
} from '@repo/types';

export interface SeedingUserAccountInterface {
  userName: string;
  email: string;
  password: string;
  role: UserRoleType;
  plan: UserPlanType;
  refreshToken: string;
  userAgent: string;
}

export interface SeedingUserInfoInterface {
  displayName: string;
  inviteCode: number;
  avatarUrl: string | null;
  status: UserStatusType;
  gender: UserGenderType;
  birthDate: Date | null;
  selfIntroduction: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface SeedingUserAuthInterface {
  authCode: string;
  authCodeExpiredAt: Date;
  isEmailAuthenticated: boolean;
  phoneNumber: string | null;
  discordId: string | null;
  googleId: string | null;
  spotifyId: string | null;
  twitchId: string | null;
  metaId: string | null;
  redditId: string | null;
  lineId: string | null;
  updatedAt: Date;
}

export interface SeedingUserSettingInterface {
  language: LanguageType;
  timeZone: TimeZoneType;
  theme: ThemeType;
  generalSettingsCode: number;
  privacySettingsCode: number;
}

export interface SeedingUserResponse {
  id: string;
  userAccount: SeedingUserAccountInterface;
  userInfo: SeedingUserInfoInterface;
  userAuth: SeedingUserAuthInterface;
  userSetting: SeedingUserSettingInterface;
}
