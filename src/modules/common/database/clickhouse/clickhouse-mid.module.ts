import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabaseModule } from '../create-database-module.helper';
import { createClickhouseDriver } from './create-clickhouse-driver.helper';

@Module({})
export class ClickhouseMidModule extends createDatabaseModule(
  (configService: ConfigService) =>
    createClickhouseDriver({
      host: configService.getOrThrow<string>('CH_MID_HOST'),
      port: configService.getOrThrow<number>('CH_MID_PORT'),
      username: configService.getOrThrow<string>('CH_MID_USERNAME'),
      password: configService.getOrThrow<string>('CH_MID_PASSWORD'),
    }),
) {}
