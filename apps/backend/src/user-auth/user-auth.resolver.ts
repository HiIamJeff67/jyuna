/* =============== Main Libraries =============== */
import { Query, Resolver } from '@nestjs/graphql';
import { UserAuthService } from './user-auth.service';
import { UseGuards } from '@nestjs/common';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { JwtAccessGuard, JwtAnyGuard, JwtRefreshGuard } from '../auth/guards';
import { UserAuth } from './models/user-auth.model';
/* =============== Module Dependencies =============== */

/* =============== Shared Repositories =============== */
import { AccessTokenInterface, TokenDataInterface } from '@repo/interfaces';
/* =============== Shared Repositories =============== */

/* =============== Others =============== */
import { User } from '../auth/decorators';
/* =============== Others =============== */

@Resolver('user-auth')
export class UserAuthResolver {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Query(() => UserAuth)
  @UseGuards(JwtAnyGuard, JwtAccessGuard, JwtRefreshGuard)
  async getMyAuth(
    @User() user: TokenDataInterface,
  ): Promise<UserAuth & AccessTokenInterface> {
    try {
      const res = await this.userAuthService.getMyAuth(user.id);
      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }
}
