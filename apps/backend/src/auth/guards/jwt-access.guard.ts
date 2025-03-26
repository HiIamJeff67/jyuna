/* =============== Main Libraries =============== */
import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { JWTACCESSSYMBOL } from '@repo/constants';
/* =============== Shared Repositories =============== */

export class JwtAccessGuard
  extends AuthGuard(JWTACCESSSYMBOL)
  implements CanActivate
{
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const gqlRequest = gqlContext.getContext().req;

    // overloading the getRequest function with new function to get the requset decoded from graphql
    // so that we can passing it to the params of validate() in the strategy
    context.switchToHttp().getRequest = function () {
      return gqlRequest;
    };

    return super.canActivate(context);
  }
}
