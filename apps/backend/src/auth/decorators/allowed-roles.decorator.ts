/* =============== Main Libraries =============== */
import { Reflector } from '@nestjs/core';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { UserRoleType } from '@repo/types';
/* =============== Shared Repositories =============== */

export const AllowedRoles = Reflector.createDecorator<UserRoleType[]>();
