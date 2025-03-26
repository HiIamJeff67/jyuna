/* =============== Main Libraries =============== */
import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { JWTREFRESHSYMBOL } from '@repo/constants';
/* =============== Shared Repositories =============== */

export class JwtRefreshGuard
  extends AuthGuard(JWTREFRESHSYMBOL)
  implements CanActivate
{
  constructor() {
    super({});
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

    context.switchToHttp().getRequest = function () {
      return gqlRequest;
    };

    return super.canActivate(context);
  }
}
