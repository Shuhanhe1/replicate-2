import { Module } from '@nestjs/common';
import { PaperService } from './paper.service';
import { PrismaModule } from '../database/prisma.module';
import { PaperParserModule } from '../paper-parser/paper-parser.module';
import { PubmedModule } from '../pubmed/pubmed.module';
import { PaperController } from './paper.controller';
import { OpenaiModule } from '../openai/openai.module';
import { UploadModule } from '../upload/upload.module';
import { ConductscienceSdkModule } from '../conductscienceSdk/conductscienceSdk.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    PrismaModule,
    PaperParserModule,
    PubmedModule,
    OpenaiModule,
    UploadModule,
    ConductscienceSdkModule,
    ProductModule,
  ],
  providers: [PaperService],
  controllers: [PaperController],
})
export class PaperModule {}
