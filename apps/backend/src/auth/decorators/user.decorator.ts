/* =============== Main Libraries =============== */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { TokenDataInterface } from '@repo/interfaces';
import { UserNotFoundException } from '@repo/exceptions';
/* =============== Shared Repositories =============== */

export const User = createParamDecorator(
  (data: keyof TokenDataInterface | undefined, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const user = gqlContext.getContext().req.user;
    if (!user) throw UserNotFoundException;
    return data ? user.data : user;
  },
);
