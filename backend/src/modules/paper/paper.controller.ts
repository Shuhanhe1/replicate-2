import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { ParseSinglePubmedPaperDto } from './paper.dto';
import { PrismaService } from '../database/prisma.service';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { formatPagination } from 'src/common/utils/formatPrismaPagination';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UserRole } from '@prisma/client';
import { PaperService } from './paper.service';
import { ParsedPaper } from '../paper-parser/types/parsed-paper.type';
import { PubmedService } from '../pubmed/pubmed.service';

@Controller('paper')
export class PaperController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paperService: PaperService,
    private readonly pubmedService: PubmedService,
  ) {}

  @Post('parse/single/pubmed')
  @UseGuards(AccessTokenGuard)
  @Roles(UserRole.ADMIN)
  async parsePubmed(@Body() body: ParseSinglePubmedPaperDto) {
    const { pubmedId } = body;

    const existingPaper = await this.prismaService.paper.findFirst({
      where: {
        pubmedId,
      },
    });

    if (existingPaper) {
      throw new BadRequestException('Paper with this pubmed id already exists');
    }

    let pubmedData: ParsedPaper;

    try {
      pubmedData = await this.pubmedService.find(pubmedId);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Not able to access the pubmed paper. Make sure that the pubmed id is correct and paper has open access.',
      );
    }

    this.paperService.parsePaper(pubmedId, pubmedData);

    return {
      message: 'Job added to the queue',
    };
  }

  /*   @Post('parse/bulk/pubmed')
  @UseGuards(AccessTokenGuard)
  @Roles(UserRole.ADMIN)
  async parseBulkPubmed(@Body() body: ParseBulkPubmedPapersDto) {
    
  } */

  @Get(':slug')
  async getPaper(@Param('slug') slug: string) {
    const paper = await this.prismaService.paper.findUnique({
      where: {
        slug,
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

    if (!paper) throw new NotFoundException('Paper not found');

    return paper;
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
        orderBy: {
          createdAt: 'desc',
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

  @Delete(':slug')
  @UseGuards(AccessTokenGuard)
  @Roles(UserRole.ADMIN)
  async deletePaper(@Param('slug') slug: string) {
    const paper = await this.prismaService.paper.findUnique({
      where: {
        slug,
      },
    });

    if (!paper) throw new NotFoundException('Paper not found');

    await this.prismaService.paper.delete({
      where: {
        id: paper.id,
      },
    });

    return paper;
  }
}
