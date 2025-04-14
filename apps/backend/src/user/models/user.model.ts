/* =============== Main Libraries =============== */
import { Field, IntersectionType, ObjectType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsIn,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
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
import {
  MaxDisplayNameLength,
  MaxUserNameLength,
  MinDisplayNameLength,
  MinUserNameLength,
} from '@repo/constants';
import { UserPlanEnum, UserRoleEnum } from '@repo/enums';
/* =============== Shared Repositories =============== */

/* ============================== Type Models ============================== */
@ObjectType()
export class User {
  @Field(() => String)
  @MinLength(MinUserNameLength)
  @MaxLength(MaxUserNameLength)
  @IsAlphanumeric()
  userName: string;

  @Field(() => String)
  @MinLength(MinDisplayNameLength)
  @MaxLength(MaxDisplayNameLength)
  @IsAlphanumeric()
  displayName: string;

  @Field(() => String, { nullable: true })
  @IsUrl()
  avatarURL?: string | null;

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
export class UserOutput extends IntersectionType(User, AccessTokenDataModel) {}
/* ============================== Output Models ============================== */
