import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class S3Service extends Client {}
