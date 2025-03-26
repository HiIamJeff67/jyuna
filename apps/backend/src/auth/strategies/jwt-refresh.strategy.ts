/* =============== Main Libraries =============== */
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtRefreshConfig from '../configs/jwt-refresh.config';
import { Request } from 'express';
import { eq } from 'drizzle-orm';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { AccessTokenCacheManager } from '../../access-token-cache/access-token-cache.manager';
import { DRIZZLE } from '../../drizzle/drizzle.module';
import { DrizzleDB } from '../../drizzle/types/drizzle';
import { extractRefreshTokenFromCookies } from '../../cookie/extractors';
import { SecureGeneratorService } from '../../secret-generator/secret-generator.service';
/* =============== Module Dependencies =============== */

/* =============== Shared Repositories =============== */
import { JWTREFRESHSYMBOL } from '@repo/constants';
import { TokenPayloadInterface, TokenDataInterface } from '@repo/interfaces';
import {
  ApiRefreshAccessTokenException,
  AuthInvalidRefreshTokenException,
  AuthMissingTokenException,
  AuthUserAgentNotMatchException,
} from '@repo/exceptions';
import { UserPlanType, UserRoleType, UserStatusType } from '@repo/types';
/* =============== Shared Repositories =============== */

/* =============== Database Schema =============== */
import { UserTable } from '../../drizzle/schema/user.schema';
import { UserInfoTable } from '../../drizzle/schema/userInfo.schema';
import { UserSettingTable } from '../../drizzle/schema/userSetting.schema';
/* =============== Database Schema =============== */

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWTREFRESHSYMBOL,
) {
  constructor(
    private readonly secureGeneratorService: SecureGeneratorService,
    private readonly accessTokenCacheManager: AccessTokenCacheManager,
    @Inject(jwtRefreshConfig.KEY)
    private readonly jwtRefreshConfiguration: ConfigType<
      typeof jwtRefreshConfig
    >,
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractRefreshTokenFromCookies,
      ]),
      secretOrKey: jwtRefreshConfiguration.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: TokenPayloadInterface,
  ): Promise<TokenDataInterface> {
    const currentRefreshToken = ExtractJwt.fromExtractors([
      extractRefreshTokenFromCookies,
    ])(request);
    if (!currentRefreshToken) {
      throw AuthMissingTokenException;
    }

    const user = (await this.db
      .select({
        id: UserTable.id,
        userName: UserTable.userName,
        email: UserTable.email,
        userAgent: UserTable.userAgent,
        status: UserInfoTable.status,
        role: UserTable.role,
        plan: UserTable.plan,
        generalSettingsCode: UserSettingTable.generalSettingsCode,
        privacySettingsCode: UserSettingTable.privacySettingsCode,
      })
      .from(UserTable)
      .where(eq(UserTable.id, payload.sub))
      .leftJoin(UserInfoTable, eq(UserInfoTable.userId, UserTable.id))
      .leftJoin(
        UserSettingTable,
        eq(UserSettingTable.userId, UserTable.id),
      )) as
      | {
          id: string;
          userName: string;
          email: string;
          userAgent: string;
          status: UserStatusType;
          role: UserRoleType;
          plan: UserPlanType;
          generalSettingsCode: number;
          privacySettingsCode: number;
        }[]
      | undefined;
    if (!user || user.length === 0) {
      throw AuthInvalidRefreshTokenException;
    }
    if (user[0].userAgent !== request.headers['user-agent']) {
      throw AuthUserAgentNotMatchException;
    }

    const newAccessTokenData =
      await this.secureGeneratorService.generateAccessToken({
        sub: user[0].id,
        email: user[0].email,
        role: user[0].role,
        plan: user[0].plan,
      });
    const responseOfSettingCache = await this.accessTokenCacheManager.set(
      newAccessTokenData,
      user[0],
    );
    if (!responseOfSettingCache) {
      throw ApiRefreshAccessTokenException;
    }

    return {
      ...user[0],
      accessTokenData: newAccessTokenData,
    };
  }
}
