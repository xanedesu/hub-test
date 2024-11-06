/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CacheInterceptor } from '../shared/cache.interceptor';

@Injectable()
export class S3CacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor<unknown, unknown>
{
  protected key(request: FastifyRequest): string {
    return 'key';
  }
}
