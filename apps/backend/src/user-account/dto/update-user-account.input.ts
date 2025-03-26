/* =============== Main Libraries =============== */
import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { UserPlanEnum, UserRoleEnum } from '@repo/enums';
import {
  UserPlanType,
  UserPlanValues,
  UserRoleType,
  UserRoleValues,
} from '@repo/types';
/* =============== Shared Repositories =============== */

@InputType()
export class UpdateAccountInput {
  @Field(() => UserRoleEnum)
  @IsIn(UserRoleValues)
  role: UserRoleType;

  @Field(() => UserPlanEnum)
  @IsIn(UserPlanValues)
  plan: UserPlanType;
}
