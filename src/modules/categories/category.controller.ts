import {
  Controller,
  Get,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../common/cache/redis';
import { CacheOptions } from '../common/cache/shared';
import { UserCacheStrategy } from '../common/cache/shared/strategies';
import { RateLimitInterceptor } from '../common/rate-limit';
import { CategoryService } from './category.service';
import { CategoriesRequestDto, CategoryDto } from './dto';

@Controller({
  path: ['categories'],
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseInterceptors(RedisCacheInterceptor, RateLimitInterceptor)
  @CacheOptions({
    strategies: [UserCacheStrategy],
  })
  @SerializeOptions({
    type: CategoryDto,
  })
  findAll(@Query() query: CategoriesRequestDto): Promise<CategoryDto[]> {
    return this.categoryService.findAll(query);
  }
}
