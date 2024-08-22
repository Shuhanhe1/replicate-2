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

  async parsePubmed(pubmedId: string) {
    const pubmedData = await this.pubmedService.get(pubmedId);
    const paperData = await this.paperParserService.parse({
      paper: pubmedData,
    });

    await this.prismaService.paper.create({
      data: {
        title: paperData.title,
        pubmedId,
        experiments: {
          create: paperData.experiments.map((experiment) => ({
            title: experiment.title,
            items: {
              create: experiment.items.map((item) => ({
                title: item.title,
                description: item.description,
              })),
            },
            methodologies: {
              create: experiment.methodologies.map((methodology) => ({
                title: methodology.title,
                description: methodology.description,
              })),
            },
            instructions: {
              create: experiment.instructions.map((instruction) => ({
                title: instruction.title,
                description: instruction.description,
              })),
            },
          })),
        },
        }
      },
      include: {
        experiments: {
          include: {
            items: true,
            methodologies: true,
            instructions: true,
          },
        },
      }
    });
  }
}
