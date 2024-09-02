import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class PubmedService {
  async find(id: string) {
    const { data } = await axios.get(
      `https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pmcoa.cgi/BioC_json/${id}/unicode`,
    );
    return data;
  }

  async findMany(params: { query: string; page: number }) {
    const { data } = await axios.get('https://pubmed.ncbi.nlm.nih.gov/', {
      params: {
        term: params.query,
        page: params.page,
      },
    });

    const $ = cheerio.load(data);

    const papers = [];
    $('span.docsum-pmid').each((index, element) => {
      papers.push({ id: $(element).text() });
    });
    const total = Number(
      $('.results-amount .value').first().text().replace(/,/g, ''),
    );

    return { data: papers, pagination: { total } };
  }
}
