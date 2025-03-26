/* =============== Main Libraries =============== */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

/* =============== Other =============== */
import { AllowedPlans } from '../decorators/allowed-plans.decorator';
/* =============== Other =============== */

@Injectable()
export class UserPlansGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedPlans = this.reflector.get(AllowedPlans, context.getHandler());
    if (allowedPlans.length === 0) return false;

    const gqlContext = GqlExecutionContext.create(context);
    const user = gqlContext.getContext().req.user;
    if (!user || !user.plan) return false;

    for (const allowedRole of allowedPlans) {
      if (user.plan === allowedRole) return true;
    }

    return false;
  }
}
