import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  CategoriesFindAllResponseDto,
  ICategoriesService,
} from 'src/modules/categories/v1';

@Injectable()
export class V1CategoriesService implements ICategoriesService {
  findAll(): Promise<CategoriesFindAllResponseDto[]> {
    throw new NotImplementedException();
  }
}
