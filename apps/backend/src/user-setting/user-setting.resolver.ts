/* =============== Main Libraries =============== */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { UserSettingService } from './user-setting.service';
import { JwtAccessGuard, JwtAnyGuard, JwtRefreshGuard } from '../auth/guards';
/* =============== Module Dependencies =============== */

/* =============== Models =============== */
import { UpdateUserSettingInput } from './dto/update-user-setting.input';
import {
  AffectedUserSettingOutput,
  UserSettingOutput,
} from './models/user-setting.model';
/* =============== Models =============== */

/* =============== Others =============== */
import { User } from '../auth/decorators';
/* =============== Others =============== */

/* =============== Shared Repositories =============== */
import { TokenDataInterface } from '@repo/interfaces';
/* =============== Shared Repositories =============== */

@Resolver()
export class UserSettingResolver {
  constructor(private readonly userSettingService: UserSettingService) {}

  /* ============================== Query Operations ============================== */
  @Query(() => UserSettingOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async getMySetting(
    @User() user: TokenDataInterface,
  ): Promise<UserSettingOutput> {
    try {
      const res = await this.userSettingService.getOneByUserId(user.id);
      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }
  /* ============================== Query Operations ============================== */

  /* ============================== Mutation Operations ============================== */
  @Mutation(() => AffectedUserSettingOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async updateMySetting(
    @User() user: TokenDataInterface,
    @Args('input') input: UpdateUserSettingInput,
  ): Promise<AffectedUserSettingOutput> {
    try {
      const res = await this.userSettingService.updateOneByUserId(
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
