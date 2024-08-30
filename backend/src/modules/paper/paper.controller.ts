import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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
import { PaperParserService } from '../paper-parser/paper-parser.service';
import { ParsedPaper } from '../paper-parser/types/parsed-paper.type';
import { PubmedService } from '../pubmed/pubmed.service';
import { OpenaiService } from '../openai/openai.service';
import { UploadService } from '../upload/upload.service';

@Controller('paper')
export class PaperController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paperParserService: PaperParserService,
    private readonly pubmedService: PubmedService,
    private readonly openaiService: OpenaiService,
    private readonly uploadService: UploadService,
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

    let pubmedData = await this.pubmedService.find(pubmedId);

    try {
      pubmedData = await this.paperParserService.parse({
        paper: pubmedData,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Not able to access the pubmed paper. Make sure that the pubmed id is correct and paper has open access.',
      );
    }

    let paperData: ParsedPaper;

    try {
      paperData = await this.paperParserService.parse({
        paper: pubmedData,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error validating the paper data');
    }

    const image = await this.openaiService.generateImage({
      prompt: `Make preview for the paper titled: ${paperData.title}
      Image should be realistic.
      Do not include any text`,
    });

    const uploadedImage = await this.uploadService.uploadFile(image, {
      filename: `${paperData.title}.png`,
    });

    return this.prismaService.paper.create({
      data: {
        title: paperData.title,
        pubmedId,
        authors: paperData.authors,
        image: uploadedImage.path,
        tags: paperData.tags,
        experiments: {
          create: paperData.experiments.map((experiment) => ({
            title: experiment.title,
            items: {
              create: experiment.items.map((item) => ({
                material: item.material,
                supplier: item.supplier,
                usage: item.usage,
              })),
            },
            methodologies: {
              create: experiment.methodologies.map((methodology) => ({
                text: methodology.text,
              })),
            },
            instructions: {
              create: experiment.instructions.map((instruction) => ({
                text: instruction.text,
              })),
            },
          })),
        },
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

  /*   @Post('parse/bulk/pubmed')
  @UseGuards(AccessTokenGuard)
  @Roles(UserRole.ADMIN)
  async parseBulkPubmed(@Body() body: ParseBulkPubmedPapersDto) {
    
  } */

  @Get(':id')
  async getPaper(@Param('id') id: string) {
    const paper = await this.prismaService.paper.findUnique({
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
