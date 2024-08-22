import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PubmedService {
  async get(id: string) {
    const { data } = await axios.get(
      `https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pmcoa.cgi/BioC_json/${id}/unicode`,
    );
    return data;
  }
}
