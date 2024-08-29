import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PaperParserService } from '../paper-parser/paper-parser.service';
import { PubmedService } from '../pubmed/pubmed.service';

@Injectable()
export class PaperService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paperParserService: PaperParserService,
    private readonly pubmedService: PubmedService,
  ) {}
}
