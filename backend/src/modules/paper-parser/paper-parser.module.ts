import { Module } from '@nestjs/common';
import { OpenaiModule } from '../openai/openai.module';
import { PaperParserService } from './paper-parser.service';
import { PaperParserController } from './paper-parser.controller';
import { PubmedModule } from '../pubmed/pubmed.module';

@Module({
  imports: [OpenaiModule, PubmedModule],
  providers: [PaperParserService],
  controllers: [PaperParserController],
  exports: [PaperParserService],
})
export class PaperParserModule {}
