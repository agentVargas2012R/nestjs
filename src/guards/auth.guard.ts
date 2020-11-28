import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
  //@ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log('\ntoken');
    console.log(ctx.req.token);

    if (!ctx.req.token) {
      console.log('no authorization header!');
      return false;
    }

    ctx.student = await this.validation(ctx.req.token);
    return true;
  }

  async validation(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }

    try {
      const token = auth.split(' ')[1];
      return await jwt.verify(token, 'my_super_secret_on_github');
    } catch (err) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
