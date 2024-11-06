import { DynamicModule, Module } from '@nestjs/common';
import { RateLimitConfig } from './interfaces';
import { RateLimitCoreModule } from './rate-limit-core.module';
import { RateLimitService } from './rate-limit.service';

@Module({})
export class RateLimitModule {
  static forRoot(config: RateLimitConfig): DynamicModule {
    return {
      module: this,
      imports: [RateLimitCoreModule.forRoot(config)],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: this,
      providers: [RateLimitService],
      exports: [RateLimitService],
    };
  }
}
