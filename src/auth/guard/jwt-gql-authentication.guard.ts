import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtGqlAuthenticationGuard extends AuthGuard('jwt') {
  getRequest(ctx: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(ctx);
    return gqlCtx.getContext().req;
  }
}
