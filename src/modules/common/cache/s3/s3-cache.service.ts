import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { json } from 'node:stream/consumers';
import { Cache, CacheResult, SetOptions } from '../shared';

@Injectable()
export class S3CacheService implements Cache {
  constructor(private readonly client: Client) {}

  async get<T = unknown>(key: string): Promise<CacheResult<T>> {
    const result = await this.client.getObject('cache', key);

    return {
      stream: () => result,
      value: () => json(result) as Promise<T>,
    };
  }

  // TODO: на уровне метода добавить возможность передавать любой тип данных
  // например стрим, буфер, объект
  // все что не стрим и не буфер, должно сериализовываться через JSON.stringify
  async set<T = unknown>(
    key: string,
    value: T,
    options: SetOptions,
  ): Promise<T> {
    await this.client.putObject(
      'cache',
      key,
      JSON.stringify(value),
      undefined,
      {
        'Expires-At': options.expiresAt,
      },
    );

    return value;
  }

  async has(key: string): Promise<boolean> {
    try {
      const result = await this.client.statObject('cache', key);

      return Number(result.metaData['Expires-At']) <= Date.now();
    } catch {
      return false;
    }
  }
}
