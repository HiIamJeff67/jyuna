import { _DatabaseInstace } from '../_db';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { UserSeedingOperatorConfig } from '../configs';
import {
  FakeAuthCodePlaceHolder,
  FakeRefreshTokenPlaceholder,
  FakeUserAgentPlaceHolder,
  MAX_SEED_QUANTITY,
  MIN_SEED_QUANTITY,
  SeedingLanguageValues,
  SeedingUserPlanValues,
  SeedingUserRoleValues,
} from '../constants';
import {
  SeedingUserAuthInterface,
  SeedingUserInfoInterface,
  SeedingUserAccountInterface,
  SeedingUserResponse,
  SeedingUserSettingInterface,
} from '../interfaces/user.interface';
import { UserTable } from '../../../src/drizzle/schema/user.schema';
import {
  CreateUserAuthException,
  CreateUserException,
  CreateUserInfoException,
  CreateUserSettingException,
} from '@repo/exceptions';
import { addMinutes, getFormattedDateString, getTimeZone } from '@repo/utils';
import { UserInfoTable } from '../../../src/drizzle/schema/userInfo.schema';
import { UserAuthTable } from '../../../src/drizzle/schema/userAuth.schema';
import { UserSettingTable } from '../../../src/drizzle/schema/userSetting.schema';

export class UserSeedingOperator extends _DatabaseInstace {
  private config: UserSeedingOperatorConfig;

  public constructor(config: UserSeedingOperatorConfig) {
    super();
    this.config = config;

    if (!fs.existsSync(this.config.outputPath)) {
      fs.mkdirSync(this.config.outputPath, { recursive: true });
    }
    this.config.outputPath = path.join(
      this.config.outputPath,
      `seeding-user-output-${getFormattedDateString(new Date())}.txt`,
    );
  }

  private _getRandomValues<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  public async seedUsers(
    quantity: number,
  ): Promise<SeedingUserResponse[] | undefined> {
    try {
      if (quantity > MAX_SEED_QUANTITY || quantity < MIN_SEED_QUANTITY) {
        throw Error(
          'Arguments of `quantity` should be less than or equal to the maximum quantity: ' +
            String(MAX_SEED_QUANTITY) +
            ' and greater than or equal to the minimum quantity: ' +
            String(MIN_SEED_QUANTITY),
        );
      }

      // generate data by faker for inserting into UserTable using only one sql operation
      const userAccounts: SeedingUserAccountInterface[] = await Promise.all(
        Array.from({ length: quantity }, async () => ({
          userName:
            faker.person.firstName() +
            Math.floor(Math.random() * 1000).toString(),
          email: faker.internet.email(),
          password: await bcrypt.hash(
            this.config.isPasswordUniformed
              ? this.config.password
              : faker.internet.password(),
            Number(process.env.SALT_OR_ROUND),
          ),
          role: this.config.isRoleUniformed
            ? this.config.role
            : this._getRandomValues(SeedingUserRoleValues),
          plan: this.config.isPlanUniformed
            ? this.config.plan
            : this._getRandomValues(SeedingUserPlanValues),
          refreshToken: FakeRefreshTokenPlaceholder,
          userAgent: FakeUserAgentPlaceHolder,
        })),
      );

      return await this._db.transaction(async (tx) => {
        const responseOfInsertingUsers = await tx
          .insert(UserTable)
          .values(userAccounts)
          .returning({
            id: UserTable.id,
          });
        if (
          !responseOfInsertingUsers ||
          responseOfInsertingUsers.length === 0
        ) {
          throw CreateUserException;
        }

        const userInfos = responseOfInsertingUsers.map((user, index) => ({
          userId: user.id,
          userName: userAccounts[index].userName,
          displayName: faker.person.fullName(),
        }));
        const responseOfInsertingUserInfos: SeedingUserInfoInterface[] =
          (await tx.insert(UserInfoTable).values(userInfos).returning({
            displayName: UserInfoTable.displayName,
            inviteCode: UserInfoTable.inviteCode,
            avatarUrl: UserInfoTable.avatarURL,
            status: UserInfoTable.status,
            gender: UserInfoTable.gender,
            birthDate: UserInfoTable.birthDate,
            selfIntroduction: UserInfoTable.selfIntroduction,
            updatedAt: UserInfoTable.updatedAt,
            createdAt: UserInfoTable.createdAt,
          })) as SeedingUserInfoInterface[];
        if (
          !responseOfInsertingUserInfos ||
          responseOfInsertingUserInfos.length === 0
        ) {
          throw CreateUserInfoException;
        }

        const userAuths = responseOfInsertingUsers.map((user, index) => ({
          userId: user.id,
          authCode: FakeAuthCodePlaceHolder,
          authCodeExpiredAt: addMinutes(1),
        }));
        const responseOfInsertingUserAuths: SeedingUserAuthInterface[] =
          (await tx.insert(UserAuthTable).values(userAuths).returning({
            authCode: UserAuthTable.authCode,
            authCodeExpiredAt: UserAuthTable.authCodeExpiredAt,
            isEmailAuthenticated: UserAuthTable.isEmailAuthenticated,
            phoneNumber: UserAuthTable.phoneNumber,
            discordId: UserAuthTable.discordId,
            googleId: UserAuthTable.googleId,
            spotifyId: UserAuthTable.spotifyId,
            twitchId: UserAuthTable.twitchId,
            metaId: UserAuthTable.metaId,
            redditId: UserAuthTable.redditId,
            lineId: UserAuthTable.lineId,
            updatedAt: UserAuthTable.updatedAt,
          })) as SeedingUserAuthInterface[];
        if (
          !responseOfInsertingUserAuths ||
          responseOfInsertingUserAuths.length === 0
        ) {
          throw CreateUserAuthException;
        }

        const userSettings = responseOfInsertingUsers.map((user) => ({
          userId: user.id,
          language: this._getRandomValues(SeedingLanguageValues),
          timeZone: getTimeZone(new Date()),
        }));
        const responseOfInsertingUserSettings: SeedingUserSettingInterface[] =
          (await tx.insert(UserSettingTable).values(userSettings).returning({
            language: UserSettingTable.language,
            timeZone: UserSettingTable.timeZone,
            theme: UserSettingTable.theme,
            generalSettingsCode: UserSettingTable.generalSettingsCode,
            privacySettingsCode: UserSettingTable.privacySettingsCode,
          })) as SeedingUserSettingInterface[];
        if (
          !responseOfInsertingUserSettings ||
          responseOfInsertingUserSettings.length === 0
        ) {
          throw CreateUserSettingException;
        }

        const response = responseOfInsertingUsers.map((user, index) => ({
          id: user.id,
          userAccount: userAccounts[index],
          userInfo: responseOfInsertingUserInfos[index],
          userAuth: responseOfInsertingUserAuths[index],
          userSetting: responseOfInsertingUserSettings[index],
        }));

        if (this.config.allowOutput) {
          const dataString = JSON.stringify(response, null, 2);
          fs.writeFile(this.config.outputPath, dataString, (error) => {
            if (error) {
              throw new Error(`Error writing to file: ${error.message}`);
            }
          });
        }

        return this.config.allowReturns ? response : undefined;
      });
    } catch (error) {
      throw error;
    }
  }
}
