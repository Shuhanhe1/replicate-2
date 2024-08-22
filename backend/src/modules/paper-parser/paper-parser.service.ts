import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { ParsedPaper } from './types/parsed-paper.type';

@Injectable()
export class PaperParserService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async parse(payload: { paper: any }): Promise<ParsedPaper> {
    const output = await this.openaiService.createCompetition({
      content: `you're an ner system used to extract and form instructions and methodolgies to help researcher do an experiment from a given paper and form it in a JSON file.
                the output should be in this structure:
                {
                  "title": "Paper title",
                  "experiments": [
                    {
                      "title": "Experiment1",
                      "items": [
                        {"material": "Material1", "supplier": "Supplier1", "usage": "Usage1"},
                        {"material": "Material2", "supplier": "Supplier2", "usage": "Usage2"}
                      ],
                      "methodologies": [{"text": "Methodology1"}],
                      "instructions": [{"text": "Instruction1"}]
                    }
                  ]
                }
              as for instructions and methodologies do not include it's number
              return only json format.
            Paper: ${JSON.stringify(payload.paper)}
            `,
    });

    const json = JSON.parse(output.replace('```json', '').replace('```', ''));

    // validate the output
    if (!json.experiments) {
      throw new Error('Output should include experiments');
    }

    if (!Array.isArray(json.experiments)) {
      throw new Error('Experiments should be an array');
    }

    for (const experiment of json.experiments) {
      if (!experiment.title) {
        throw new Error('Experiment should include title');
      }

      if (!experiment.items) {
        throw new Error('Experiment should include items');
      }

      if (!Array.isArray(experiment.items)) {
        throw new Error('Items should be an array');
      }

      for (const item of experiment.items) {
        if (!item.material) {
          throw new Error('Item should include material');
        }

        if (!item.supplier) {
          throw new Error('Item should include supplier');
        }

        if (!item.usage) {
          throw new Error('Item should include usage');
        }
      }

      if (!experiment.methodologies) {
        throw new Error('Experiment should include methodologies');
      }

      if (!Array.isArray(experiment.methodologies)) {
        throw new Error('Methodologies should be an array');
      }

      if (!experiment.instructions) {
        throw new Error('Experiment should include instructions');
      }

      if (!Array.isArray(experiment.instructions)) {
        throw new Error('Instructions should be an array');
      }
    }

    return json;
  }
}
