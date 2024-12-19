import { Injectable } from '@nestjs/common';
import { ConductscienceSdkService } from '../conductscienceSdk/conductscienceSdk.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly conductscienceSdkService: ConductscienceSdkService,
  ) {}

  private async improtTo() {}
}
