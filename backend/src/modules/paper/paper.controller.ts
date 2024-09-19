import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { ConductscienceSdkService } from '../conductscienceSdk/conductscienceSdk.service';

@Controller('paper')
export class PaperController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paperParserService: PaperParserService,
    private readonly pubmedService: PubmedService,
    private readonly openaiService: OpenaiService,
    private readonly uploadService: UploadService,
    private readonly conductscienceSdkService: ConductscienceSdkService,
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

    /* const image = await this.openaiService.generateImage({
      prompt: `Make image for the paper titled: ${paperData.title}
      Image must be realistic, professional, scientific and simple.
      Image mustn't include any text.`,
    }); */

    /* const uploadedImage = await this.uploadService.uploadFile(image, {
      filename: `${paperData.title}.png`,
    }); */

    let slug = paperData.title
      .replace(/ /g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase();

    const existingPapersWithSlug = await this.prismaService.paper.findMany({
      where: {
        slug: { contains: slug },
      },
    });

    if (existingPapersWithSlug.length) {
      slug = `${slug}-${existingPapersWithSlug.length}`;
    }

    const experiments = [];

    for (const experiment of paperData.experiments) {
      const items = [];
      const methodologies = [];
      const instructions = [];

      for (const item of experiment.items) {
        let url;

        try {
          const data = await this.conductscienceSdkService.products.getByTitle({
            title: item.material,
          });
          if (data.length) {
            url = data[0].link;
          }
        } catch (error) {
          console.error(error);
        }

        items.push({
          material: item.material,
          supplier: item.supplier,
          usage: item.usage,
          ...(url && { url }),
        });
      }

      for (const methodology of experiment.methodologies) {
        methodologies.push({
          text: methodology.text,
        });
      }

      for (const instruction of experiment.instructions) {
        instructions.push({
          text: instruction.text,
        });
      }

      experiments.push({
        title: experiment.title,
        items: {
          create: items,
        },
        methodologies: {
          create: methodologies,
        },
        instructions: {
          create: instructions,
        },
      });
    }

    return this.prismaService.paper.create({
      data: {
        slug,
        title: paperData.title,
        pubmedId,
        authors: paperData.authors,
        // image: uploadedImage.path,
        tags: paperData.tags,
        experiments: {
          create: experiments,
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
