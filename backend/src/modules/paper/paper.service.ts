import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PaperParserService } from '../paper-parser/paper-parser.service';
import { PubmedService } from '../pubmed/pubmed.service';
import { ParsedPaper } from '../paper-parser/types/parsed-paper.type';
import { ConductscienceSdkService } from '../conductscienceSdk/conductscienceSdk.service';

@Injectable()
export class PaperService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paperParserService: PaperParserService,
    private readonly pubmedService: PubmedService,
    private readonly conductscienceSdkService: ConductscienceSdkService,
  ) {}

  async parsePaper(pubmedId: string, pubmedData: ParsedPaper) {
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
          if (data?.length) {
            url = data[0]?.link;
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
}
