/* =============== Main Libraries =============== */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { UserService } from './user.service';
import { JwtAccessGuard, JwtAnyGuard, JwtRefreshGuard } from '../auth/guards';
/* =============== Module Dependencies =============== */

/* =============== Models =============== */
import { UserOutput } from './models/user.model';
import { AffectedCountOutput } from '../models';
import { UpdateMeInput } from './dto/update-user.input';
/* =============== Models =============== */

/* =============== Shared Repositories =============== */
import { TokenDataInterface } from '@repo/interfaces';
/* =============== Shared Repositories =============== */

/* =============== Others =============== */
import { User } from '../auth/decorators';
/* =============== Others =============== */

@Resolver('user-account')
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

  /* ============================== Query Operations ============================== */
  @Query(() => UserOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async getMe(@User() user: TokenDataInterface): Promise<UserOutput> {
    try {
      return {
        userName: user.userName,
        displayName: user.displayName,
        avatarURL: user.avatarURL,
        email: user.email,
        role: user.role,
        plan: user.plan,
        userAgent: user.userAgent,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }
  /* ============================== Query Operations ============================== */

  /* ============================== Mutation Operations ============================== */
  @Mutation(() => AffectedCountOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async updateMe(
    @User() user: TokenDataInterface,
    @Args('input') input: UpdateMeInput,
  ): Promise<AffectedCountOutput> {
    try {
      const res = await this.UserService.updateOneByUserId(
        user.id,
        user.accessTokenData,
        input,
      );
      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }
  /* ============================== Mutation Operations ============================== */
}
