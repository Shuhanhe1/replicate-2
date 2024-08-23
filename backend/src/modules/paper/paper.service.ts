import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PaperParserService } from '../paper-parser/paper-parser.service';
import { PubmedService } from '../pubmed/pubmed.service';
import { ParsedPaper } from '../paper-parser/types/parsed-paper.type';

@Injectable()
export class PaperService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paperParserService: PaperParserService,
    private readonly pubmedService: PubmedService,
  ) {}

  async parsePubmed(pubmedId: string) {
    const existingPaper = await this.prismaService.paper.findFirst({
      where: {
        pubmedId,
      },
    });

    if (existingPaper) {
      throw new BadRequestException('Paper with this pubmed id already exists');
    }

    const pubmedData = await this.pubmedService.get(pubmedId);
    let paperData: ParsedPaper;

    try {
      paperData = await this.paperParserService.parse({
        paper: pubmedData,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Not able to access the pubmed paper. Make sure that the pubmed id is correct and paper has open access.',
      );
    }

    return this.prismaService.paper.create({
      data: {
        title: paperData.title,
        pubmedId,
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
}
