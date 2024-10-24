/* eslint-disable @typescript-eslint/no-explicit-any */

import { DynamicModule, Type } from '@nestjs/common';
import { ReportFactory } from './abstract.report-factory';
import { ReportCoreModule } from './report-core.module';
import { ReportService } from './report.service';

export class ReportModule {
  static forRoot(size?: number): DynamicModule {
    return {
      module: ReportModule,
      imports: [ReportCoreModule.forRoot(size)],
    };
  }

  static forFeature(
    module: Type,
    reports: Type<ReportFactory<any, any>>[],
  ): DynamicModule {
    return {
      module,
      providers: [ReportService, ...reports],
      exports: reports,
    };
  }
}
