import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { ProductService } from './product.service';
import { ConductscienceSdkModule } from '../conductscienceSdk/conductscienceSdk.module';

@Module({
  imports: [PrismaModule, ConductscienceSdkModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
