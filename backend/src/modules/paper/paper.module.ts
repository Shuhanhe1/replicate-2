import { Module } from '@nestjs/common';
import { PaperService } from './paper.service';
import { PrismaModule } from '../database/prisma.module';
import { PaperParserModule } from '../paper-parser/paper-parser.module';
import { PubmedModule } from '../pubmed/pubmed.module';

@Module({
  imports: [PrismaModule, PaperParserModule, PubmedModule],
  providers: [PaperService],
})
export class PaperModule {}
