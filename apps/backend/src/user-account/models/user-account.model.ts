/* =============== Main Libraries =============== */
import { Field, IntersectionType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsIn, MaxLength, MinLength } from 'class-validator';
/* =============== Main Libraries =============== */

/* =============== Models =============== */
import { AccessTokenDataModel } from '../../models';
/* =============== Models =============== */

/* =============== Shared Repositories =============== */
import {
  UserPlanType,
  UserPlanValues,
  UserRoleType,
  UserRoleValues,
} from '@repo/types';
import { MaxUserNameLength, MinUserNameLength } from '@repo/constants';
import { UserPlanEnum, UserRoleEnum } from '@repo/enums';
/* =============== Shared Repositories =============== */

/* ============================== Type Models ============================== */
@ObjectType()
export class UserAccount {
  @Field(() => String)
  @MinLength(MinUserNameLength)
  @MaxLength(MaxUserNameLength)
  userName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => UserRoleEnum)
  @IsIn(UserRoleValues)
  role: UserRoleType; // re-generate the token while updating the role

  @Field(() => UserPlanEnum)
  @IsIn(UserPlanValues)
  plan: UserPlanType; // re-generate the token while updating the plan

  @Field(() => String)
  userAgent: string;
}
/* ============================== Type Models ============================== */

/* ============================== Output Models ============================== */
@ObjectType()
export class UserAccountOutput extends IntersectionType(
  UserAccount,
  AccessTokenDataModel,
) {}
/* ============================== Output Models ============================== */
