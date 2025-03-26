/* =============== Main Libraries =============== */
import { Reflector } from '@nestjs/core';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { UserPlanType } from '@repo/types';
/* =============== Shared Repositories =============== */

export const AllowedPlans = Reflector.createDecorator<UserPlanType[]>();
