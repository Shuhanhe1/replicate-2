import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaperService } from './paper.service';
import { ParsePaperDto } from './paper.dto';
import { PrismaService } from '../database/prisma.service';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { formatPagination } from 'src/common/utils/formatPrismaPagination';

@Controller('paper')
export class PaperController {
  constructor(
    private readonly paperService: PaperService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('parse/pubmed')
  async parsePubmed(@Body() body: ParsePaperDto) {
    return this.paperService.parsePubmed(body.pubmedId);
  }

  @Get(':id')
  async getPaper(@Param('id') id: string) {
    return this.prismaService.paper.findUnique({
      where: {
        id,
      },
      include: {
        experiments: {
          include: {
            items: true,
            methodologies: true,
            instructions: true,
          },
        },
      },
    });
  }

  @Get()
  async getPapers(@Query() query: PaginationQueryDto) {
    const pagination = formatPagination(query);
    const [papers, count] = await this.prismaService.$transaction([
      this.prismaService.paper.findMany({
        ...pagination.prisma,
        include: {
          experiments: {
            include: {
              items: true,
              methodologies: true,
              instructions: true,
            },
          },
        },
      }),
      this.prismaService.paper.count(),
    ]);

    return {
      data: papers,
      pagination: {
        ...pagination.metadata,
        total: count,
      },
    };
  }
}
