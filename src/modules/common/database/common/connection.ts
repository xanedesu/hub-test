import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TrackingService } from '../../tracking';
import {
  ConnectionParams,
  Driver,
  QueryDefinition,
  QueryRunner,
} from './interfaces';

export class Connection {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    readonly driver: Driver,
    private readonly trackingService: TrackingService,
  ) {}

  query<P>(fn: QueryDefinition<P>): QueryRunner<P> {
    return {
      run: async <T>(params: ConnectionParams<P, T>) => {
        const label = this.trackingService.label(fn);
        const query = fn(params.params);

        this.logger.debug(`${label}\n`.concat(query));

        const time = this.trackingService.time(label, this.constructor.name);
        const data = await this.driver
          .query<T>(query)
          .finally(() => time.end());

        if (params?.mapper) {
          return plainToInstance(params.mapper, data);
        }

        return data;
      },
    };
  }
}
