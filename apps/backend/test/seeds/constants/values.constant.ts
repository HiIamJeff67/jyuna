import { LanguageType, UserPlanType, UserRoleType } from '@repo/types';

export const SeedingUserRoleValues: UserRoleType[] = [
  'AlphaExplorer',
  'BetaExplorer',
  'GammaExplorer',
  'NonCertified',
  'Developer',
];

export const SeedingUserPlanValues: UserPlanType[] = [
  'Free',
  'Pro',
  'Ultimate',
  'Enterprise',
];

export const SeedingLanguageValues: LanguageType[] = [
  'English',
  'Japanese',
  'SimplifiedChinese',
  'TraditionalChinese',
];
