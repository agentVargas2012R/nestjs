import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  HttpService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { Permission } from 'src/enums/permissions.enum';

export class EnrollmentGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private permission: Permission,
  ) {}
  //@ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    //call service
    const payload = `{
      getUserClaimsById(
        studentId: "${ctx.student.id}"
      ) {
        id
        name
        description
      }
    }`;
    const headersRequest = { 'Content-Type': 'application/json' };
    //@ts-ignore
    const response = await this.httpService
      .post(
        'http://localhost:3002/graphql',
        JSON.stringify({ query: payload }),
        {
          headers: headersRequest,
        },
      )
      .toPromise();
    const claims = response.data.data.getUserClaimsById;
    //check if claim is present on the student and allow the operation if so, otherwise, fail.
    const currentPermission = this.permission;
    const result = claims.filter((cl) => cl.name == currentPermission);
    return result.length > 0 ? true : false;
  }
}
