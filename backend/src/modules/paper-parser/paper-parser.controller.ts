import { Controller, Get, Param } from '@nestjs/common';
import { PaperParserService } from './paper-parser.service';
import { PubmedService } from '../pubmed/pubmed.service';

@Controller('paper-parser')
export class PaperParserController {
  constructor(
    private readonly paperParserService: PaperParserService,
    private readonly pubmedService: PubmedService,
  ) {}

  @Get('pubmed/:id')
  async getPubmedPaper(@Param('id') id: string) {
    const paperData = await this.pubmedService.get(id);

    return this.paperParserService.parse({ paper: paperData });
  }
}
