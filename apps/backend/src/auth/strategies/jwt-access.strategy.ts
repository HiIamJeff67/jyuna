/* =============== Main Libraries =============== */
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import jwtAccessConfig from '../configs/jwt-access.config';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { AccessTokenCacheManager } from '../../access-token-cache/access-token-cache.manager';
/* =============== Module Dependencies =============== */

/* =============== Shared Repository =============== */
import { JWTACCESSSYMBOL } from '@repo/constants';
import { TokenPayloadInterface, TokenDataInterface } from '@repo/interfaces';
import {
  AuthInvalidAccessTokenException,
  AuthMissingTokenException,
  AuthUserAgentNotMatchException,
} from '@repo/exceptions';
/* =============== Shared Repository =============== */

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  JWTACCESSSYMBOL,
) {
  constructor(
    @Inject(jwtAccessConfig.KEY)
    private readonly jwtAccessConfiguration: ConfigType<typeof jwtAccessConfig>,
    private readonly accessTokenCacheManager: AccessTokenCacheManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtAccessConfiguration.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: TokenPayloadInterface,
  ): Promise<TokenDataInterface> {
    const currentAccessToken =
      ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!currentAccessToken) {
      throw AuthMissingTokenException;
    }

    const user = await this.accessTokenCacheManager.get(currentAccessToken);
    if (!user || payload.sub !== user.id) {
      throw AuthInvalidAccessTokenException;
    }
    if (user.userAgent !== request.headers['user-agent']) {
      throw AuthUserAgentNotMatchException;
    }

    return {
      ...user,
      accessTokenData: {
        accessToken: currentAccessToken,
        expiresIn: this.jwtAccessConfiguration.expiresIn as string,
      },
    };
  }
}
