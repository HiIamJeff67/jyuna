import { UserPlanType, UserRoleType } from '@repo/types';

export class UserSeedingOperatorConfig {
  // if the data created by the seeding operator
  // would be used for some other operators,
  // you should set `allowReturns` to `true`
  public allowReturns: boolean = true;

  // if `output` is `true`, the result will be
  // saved to the `outputPath`
  public allowOutput: boolean = false;
  public outputPath: string = 'test/seeds/outputs';

  // if you need the seeded users have the same password for convinence,
  // then set this `isPasswordUniformed` to `true`, the password is strictly required
  // at least 8 characters containing english lower and upper case, number, and any signs
  public isPasswordUniformed: boolean = false;
  public password: string = 'Test1234!';

  // if you need the seeded users have the same role for convinence,
  // then set this `isRoleUniformed` to `true`
  public isRoleUniformed: boolean = false;
  public role: UserRoleType = 'NonCertified';

  // if you need the seeded users have the same plan for convinence,
  // then set this `isPlanUniformed` to `true`
  public isPlanUniformed: boolean = false;
  public plan: UserPlanType = 'Free';

  constructor(config: Partial<UserSeedingOperatorConfig> = {}) {
    Object.assign(this, config);
  }
}
