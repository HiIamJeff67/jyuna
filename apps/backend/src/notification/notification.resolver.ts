/* =============== Main Libraries =============== */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { NotificationService } from './notification.service';
/* =============== Module Dependencies =============== */

/* =============== Models =============== */
import {
  AffectedNotificationsOutput,
  NotificationOutput,
  PaginatedNotificationsOutput,
} from './models/notification.model';
import { AffectedCountOutput } from '../models';
import {
  GetNotificationInput,
  GetNotificationsInput,
} from './dto/get-notification.input';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { DeleteNotificationInput } from './dto/delete-notification.input';
/* =============== Models =============== */

/* =============== Shared Repositories =============== */
import { TokenDataInterface } from '@repo/interfaces';
import { UserRoleEnum } from '@repo/enums';
/* =============== Shared Repositories =============== */

/* =============== Others =============== */
import { JwtAccessGuard, JwtAnyGuard, JwtRefreshGuard } from '../auth/guards';
import { User } from '../auth/decorators';
import { AllowedRoles } from '../auth/decorators/allowed-roles.decorator';
import { UserRolesGuard } from '../auth/guards/user-role.guard';
/* =============== Others =============== */

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  /* ============================== Query Operations ============================== */
  @Query(() => NotificationOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async getMyNotification(
    @User() user: TokenDataInterface,
    @Args('input') input: GetNotificationInput,
  ): Promise<NotificationOutput> {
    try {
      const res = await this.notificationService.getOneById(user.id, input);
      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  @Query(() => PaginatedNotificationsOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async getMyNotifications(
    @User() user: TokenDataInterface,
    @Args('input') input: GetNotificationsInput,
  ): Promise<PaginatedNotificationsOutput> {
    try {
      const res = await this.notificationService.getAll(user.id, input);
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
  @Mutation(() => AffectedNotificationsOutput)
  @AllowedRoles([UserRoleEnum.Developer, UserRoleEnum.Admin]) // probably for devOps
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]), UserRolesGuard)
  async createNofications(
    @User() user: TokenDataInterface,
    @Args('input') input: CreateNotificationInput,
  ): Promise<AffectedNotificationsOutput> {
    try {
      const res = await this.notificationService.createSomeByUserId(input);
      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => AffectedCountOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async updateMyNotifications(
    @User() user: TokenDataInterface,
    @Args('input') input: UpdateNotificationInput,
  ): Promise<AffectedCountOutput> {
    try {
      const res = await this.notificationService.updateOneById(user.id, input);

      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => AffectedCountOutput)
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  async deleteMyNotifications(
    @User() user: TokenDataInterface,
    @Args('input') input: DeleteNotificationInput,
  ): Promise<AffectedCountOutput> {
    try {
      const res = await this.notificationService.deleteSomeById(user.id, input);

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
