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
                  "tags": ["tag1", "tag2"],
                  "authors": ["author1", "author2"],
                  "experiments": [
                    {
                      "title": "Experiment title or number if title not specified (Experiment 1)",
                      "authors": ["author1", "author2"],
                      "tags": ["tag1", "tag2"],
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
              if no data for string field or not specified return null, if not data for array field return empty array.
              Authors are listed here: {
                ...
                "name_0": "surname:Gehring;given-names:Tiago V.",
                "name_1": "surname:Luksys;given-names:Gediminas",
                "name_2": "surname:Sandi;given-names:Carmen",
                "name_3": "surname:Vasilaki;given-names:Eleni",
                "section_type": "TITLE",
                ...
              }
              Author should be formatted this way: "Given-name Surname'
              Try to figure out the experiment item supplier, often times the supplier is just the ( XXX) next to the name of the item, but if can't then null
            Paper: ${JSON.stringify(payload.paper)}
            `,
    });

    const json = JSON.parse(output.replace('```json', '').replace('```', ''));

    console.log(JSON.stringify(json, null, 2));
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

    if (!json.title) {
      throw new Error('Output should include title');
    }

    if (!json.tags) {
      throw new Error('Output should include tags');
    }

    if (!Array.isArray(json.tags)) {
      throw new Error('Tags should be an array');
    }

    if (!json.authors) {
      throw new Error('Output should include authors');
    }

    if (!Array.isArray(json.authors)) {
      throw new Error('Authors should be an array');
    }

    return json;
  }
}
